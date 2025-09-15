import { fetcher } from '@/lib/fetcher';

import { END_POINTS } from '@/lib/constants/routes';
import { useMutation } from '@tanstack/react-query';

interface postSendEmailVerifyCodeRequest {
  email: string;
}

const postSendEmailVerifyCode = async (
  body: postSendEmailVerifyCodeRequest,
) => {
  return await fetcher.post(END_POINTS.SEND_EMAIL_VERIFY_CODE, body);
};

const usePostSendEmailVerifyCode = () =>
  useMutation({
    mutationFn: postSendEmailVerifyCode,
    mutationKey: ['sendEmailVerifyCode'],
    onSuccess: data => {
      console.log('Post successful:', data);
      return data;
    },
    onError: error => {
      console.error('Post failed:', error);
      return error;
    },
  });

export default usePostSendEmailVerifyCode;
