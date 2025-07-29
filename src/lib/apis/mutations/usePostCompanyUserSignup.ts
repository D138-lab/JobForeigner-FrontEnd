import { END_POINTS } from '@/lib/constants/routes';
import { RegisterValues } from '@/lib/schemas/registerSchema';
import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

interface PostCompanyUserSignupRequest
  extends Omit<RegisterValues, 'passwordConfirm'> {}

const postCompanyUserSignup = async (body: PostCompanyUserSignupRequest) => {
  return fetcher.post<{ success: boolean; data: { id: number } }>(
    END_POINTS.COMPANY_SIGN_UP,
    body,
    { skipAuth: true },
  );
};

const usePostCompanyUserSignup = () =>
  useMutation({
    mutationFn: postCompanyUserSignup,
    mutationKey: ['companySignup'],
    onSuccess: data => {
      console.log('Post successful:', data);
      return data;
    },
    onError: error => {
      console.error('Post failed:', error);
      return error;
    },
  });

export default usePostCompanyUserSignup;
