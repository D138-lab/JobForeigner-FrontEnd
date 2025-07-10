import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

interface PatchUserProfileInfoRequest {
  phoneNumber: string;
  email: string;
  address: string;
  detailAddress: string;
  zipcode: string;
}

const patchUserProfileInfo = async (body: PatchUserProfileInfoRequest) => {
  return await fetcher.patch<PatchUserProfileInfoRequest>(
    '/api/v1/members/me',
    body,
  );
};

const usePatchUserProfileInfo = () =>
  useMutation({
    mutationFn: patchUserProfileInfo,
    mutationKey: ['userProfileInfo'],
    onSuccess: data => {
      console.log('Patch successful:', data);
    },
    onError: error => {
      console.error('Patch failed:', error);
    },
  });

export default usePatchUserProfileInfo;
