import { CustomAxiosRequestConfig, instance } from '@/lib/fetcher';

import { END_POINTS } from '@/lib/constants/routes';
import { LOCAL_STORAGE } from '@/lib/constants';
import { LoginValues } from '@/lib/schemas/loginSchema';
import { useMutation } from '@tanstack/react-query';

const postSignin = async (body: LoginValues) => {
  const config: CustomAxiosRequestConfig = {
    skipAuth: true,
    withCredentials: true,
  };

  const response = await instance.post(END_POINTS.SIGN_IN, body, config);

  const rawAuthorization = response.headers['authorization'];

  if (rawAuthorization && rawAuthorization.startsWith('Bearer ')) {
    const token = rawAuthorization.replace('Bearer ', '');
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, token);
  }

  return response.data;
};

const usePostSignin = () =>
  useMutation({
    mutationFn: postSignin,
    mutationKey: ['signin'],
    onSuccess: data => {
      console.log('Post successful:', data);
      return data;
    },
    onError: error => {
      console.error('Post failed:', error);
      return error;
    },
  });

export default usePostSignin;
