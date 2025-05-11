import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  HttpStatusCode,
} from 'axios';
import { Mutex } from 'async-mutex';
import { API_URL, LOCAL_STORAGE } from './constants';
import { refreshAccessToken } from './refreshAccessToken';

// 기본 설정
const defaultConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 토큰 갱신 동기화를 위한 뮤텍스
const tokenRefreshMutex = new Mutex();

// Axios 인스턴스 생성
export const instance: AxiosInstance = axios.create(defaultConfig);

// 요청 인터셉터: Authorization 헤더 자동 설정
instance.interceptors.request.use(
  config => {
    const accessToken = window.localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
    if (accessToken && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터: 401 처리 및 토큰 갱신
instance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config;
    const response = error.response;

    if (
      response &&
      response.status === HttpStatusCode.Unauthorized &&
      originalConfig
    ) {
      try {
        let accessToken: string | undefined;

        if (tokenRefreshMutex.isLocked()) {
          // 이미 갱신 중이면 대기 후 새 토큰 가져오기
          await tokenRefreshMutex.waitForUnlock();

          const newAccessToken = window.localStorage.getItem(
            LOCAL_STORAGE.ACCESS_TOKEN,
          );

          if (newAccessToken) {
            accessToken = newAccessToken;
          }
        } else {
          await tokenRefreshMutex.acquire();
          try {
            accessToken = await refreshAccessToken();
          } finally {
            tokenRefreshMutex.release();
          }
        }

        if (accessToken && originalConfig.headers) {
          originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        // 요청 재시도
        return instance(originalConfig);
      } catch (err) {
        // 리프레시 토큰 만료 시 로컬 스토리지 정리
        if (
          err instanceof AxiosError &&
          err.response?.config.url?.includes(`리프레시 토큰 API URL`)
        ) {
          window.localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
          window.localStorage.removeItem(LOCAL_STORAGE.REFRESH_TOKEN);
        }
        console.warn('[axios] token refresh error', err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

// 헬퍼: 응답 데이터만 반환
async function resultify<T>(promise: Promise<AxiosResponse<T>>): Promise<T> {
  const { data } = await promise;
  return data;
}

// 편리한 호출기
export const fetcher = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    resultify<T>(instance.get<T>(url, config)),
  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    resultify<T>(instance.post<T>(url, data, config)),
  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    resultify<T>(instance.put<T>(url, data, config)),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    resultify<T>(instance.delete<T>(url, config)),
};
