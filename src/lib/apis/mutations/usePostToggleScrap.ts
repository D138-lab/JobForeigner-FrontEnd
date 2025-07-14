import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

const postToggleScrap = async (postId: number) => {
  return fetcher.post(`/api/v1/scrap/${postId}`);
};

const usePostToggleScarp = () =>
  useMutation({
    mutationFn: postToggleScrap,
    mutationKey: ['postToggleScrap'],
    onSuccess: data => {
      console.log('Post successful:', data);
    },
    onError: error => {
      console.error('Post failed:', error);
    },
  });

export default usePostToggleScarp;
