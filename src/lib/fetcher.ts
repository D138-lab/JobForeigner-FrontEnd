import { API_URL, LOCAL_STORAGE } from './constants';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';

import { Mutex } from 'async-mutex';
import camelcaseKeys from 'camelcase-keys';
import { refreshAccessToken } from './refreshAccessToken';
import { END_POINTS } from './constants/routes';

// 커스텀 설정 타입 정의
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  retry?: boolean;
  extractAccessToken?: boolean; // post 요청 시 사용
}

// 기본 설정
const defaultConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  transformResponse: [
    (data: any) => {
      try {
        const parsed = JSON.parse(data);
        return camelcaseKeys(parsed, { deep: true });
      } catch {
        return data;
      }
    },
  ],
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 토큰 갱신 동기화를 위한 뮤텍스
const tokenRefreshMutex = new Mutex();

// Axios 인스턴스 생성
export const instance: AxiosInstance = axios.create(defaultConfig);

// 요청 인터셉터: Authorization 헤더 선택적 설정
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // skipAuth가 true이면 Authorization 헤더를 설정하지 않음
    if ((config as CustomAxiosRequestConfig).skipAuth) {
      return config;
    }

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
    const originalConfig = error.config as CustomAxiosRequestConfig;
    const response = error.response;

    const isUnauthorized =
      response && response.status === HttpStatusCode.Unauthorized;
    const isNotFirstRetry = originalConfig && !originalConfig.retry;
    const isAccessTokenExpired = (response?.data as any)?.code === 'S003';

    if (isUnauthorized && isNotFirstRetry && isAccessTokenExpired) {
      originalConfig.retry = true;
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
          err.response?.config.url?.includes(END_POINTS.REFRESH)
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

// 편리한 호출기 - skipAuth 옵션 추가
export const fetcher = {
  get: <T>(url: string, config?: CustomAxiosRequestConfig) =>
    resultify<T>(instance.get<T>(url, config)),
  post: <T>(url: string, data?: unknown, config?: CustomAxiosRequestConfig) =>
    resultify<T>(instance.post<T>(url, data, config)),
  put: <T>(url: string, data?: unknown, config?: CustomAxiosRequestConfig) =>
    resultify<T>(instance.put<T>(url, data, config)),
  patch: <T>(url: string, data?: unknown, config?: CustomAxiosRequestConfig) =>
    resultify<T>(instance.patch<T>(url, data, config)),
  delete: <T>(url: string, config?: CustomAxiosRequestConfig) =>
    resultify<T>(instance.delete<T>(url, config)),
};
