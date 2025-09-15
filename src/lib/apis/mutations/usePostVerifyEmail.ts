import { fetcher } from '@/lib/fetcher';

import { END_POINTS } from '@/lib/constants/routes';
import { useMutation } from '@tanstack/react-query';

interface postVerifyEmailRequest {
  email: string;
  code: string;
}

const postVerifyEmail = async (body: postVerifyEmailRequest) => {
  return await fetcher.post(END_POINTS.VERIFY_EMAIL, body);
};

const usePostVerifyEmail = () =>
  useMutation({
    mutationFn: postVerifyEmail,
    mutationKey: ['verifyEmail'],
    onSuccess: data => {
      console.log('Post successful:', data);
      return data;
    },
    onError: error => {
      console.error('Post failed:', error);
      return error;
    },
  });

export default usePostVerifyEmail;
