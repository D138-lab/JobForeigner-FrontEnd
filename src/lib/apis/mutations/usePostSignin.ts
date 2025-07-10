import { END_POINTS } from '@/lib/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { LoginValues } from '@/lib/schemas/loginSchema';
import { useMutation } from '@tanstack/react-query';

const postSignin = async (body: LoginValues) => {
  return fetcher.post<LoginValues>(END_POINTS.SIGN_IN, body);
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
