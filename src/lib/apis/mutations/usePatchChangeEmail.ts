import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

interface ChangeEmailRequest {
  email: string;
}

const patchChangeEmail = async (body: ChangeEmailRequest) => {
  return fetcher.patch<{ success: boolean | string; data: null }>(
    '/api/v1/members/me/email',
    body,
  );
};

const usePatchChangeEmail = () =>
  useMutation({
    mutationFn: patchChangeEmail,
    mutationKey: ['changeEmail'],
  });

export default usePatchChangeEmail;
