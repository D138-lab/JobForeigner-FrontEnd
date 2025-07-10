import { END_POINTS } from '@/lib/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { RegisterValues } from '@/lib/schemas/registerSchema';
import { useMutation } from '@tanstack/react-query';

interface PostForeignerSignupRequest
  extends Omit<RegisterValues, 'passwordConfirm'> {}

const postForeignerSignup = async (body: PostForeignerSignupRequest) => {
  return fetcher.post<PostForeignerSignupRequest>(
    END_POINTS.FOREIGNER_SIGN_UP,
    body,
  );
};

const usePostForeignerSignup = () =>
  useMutation({
    mutationFn: postForeignerSignup,
    mutationKey: ['signup'],
    onSuccess: data => {
      console.log('Post successful:', data);

      return data;
    },
    onError: error => {
      console.error('Post failed:', error);

      return error;
    },
  });

export default usePostForeignerSignup;
