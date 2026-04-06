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
  const expiredAccessToken = window.localStorage.getItem(
    LOCAL_STORAGE.ACCESS_TOKEN,
  );

  if (!expiredAccessToken) {
    return undefined;
  }

  const response = await axios.post(
    `${API_URL}${END_POINTS.REFRESH}`,
    undefined,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${expiredAccessToken}`,
      },
      withCredentials: true,
    },
  );

  const authorizationHeader = response.headers['authorization'];
  const headerAccessToken =
    typeof authorizationHeader === 'string' &&
    authorizationHeader.startsWith('Bearer ')
      ? authorizationHeader.replace('Bearer ', '')
      : undefined;

  const data = response.data as unknown;
  if (typeof data === 'object' && data !== null && 'data' in data) {
    const wrapped = (data as { data?: PostRefreshTokenResponse }).data;
    return {
      accessToken: headerAccessToken ?? wrapped?.accessToken,
      refreshToken: wrapped?.refreshToken,
    };
  }

  const tokenBody = data as PostRefreshTokenResponse;
  return {
    accessToken: headerAccessToken ?? tokenBody?.accessToken,
    refreshToken: tokenBody?.refreshToken,
  };
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
