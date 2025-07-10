import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

interface PatchUserProfileImageRequest {
  image: File;
}

const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file);

  return fetcher.patch<PatchUserProfileImageRequest>(
    '/api/v1/members/profile-image',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

const usePatchUserProfileInfo = () =>
  useMutation({
    mutationFn: updateProfileImage,
    mutationKey: ['userProfileImage'],
    onSuccess: data => {
      console.log('Patch successful:', data);
    },
    onError: error => {
      console.error('Patch failed:', error);
    },
  });

export default usePatchUserProfileInfo;
