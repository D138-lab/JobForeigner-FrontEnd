import axios from 'axios';
import { API_URL, LOCAL_STORAGE } from './constants';
import { END_POINTS } from './constants/routes';

interface PostRefreshTokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

const postRefreshToken = async (): Promise<
  PostRefreshTokenResponse | undefined
> => {
  const refreshToken = window.localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
  const payload = refreshToken ? { refreshToken } : {};

  const response = await axios.post(
    `${API_URL}${END_POINTS.REFRESH}`,
    payload,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    },
  );

  const data = response.data as unknown;
  if (typeof data === 'object' && data !== null && 'data' in data) {
    const wrapped = (data as { data?: PostRefreshTokenResponse }).data;
    return wrapped;
  }
  return data as PostRefreshTokenResponse;
};

export async function refreshAccessToken(): Promise<string | undefined> {
  let newAccessToken: string | undefined;
  let newRefreshToken: string | undefined;

  const tokens = await postRefreshToken();
  if (tokens) {
    newAccessToken = tokens.accessToken;
    newRefreshToken = tokens.refreshToken;
  }
  if (newAccessToken) {
    window.localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, newAccessToken);
    if (newRefreshToken) {
      window.localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, newRefreshToken);
    }
  }

  return newAccessToken;
}
