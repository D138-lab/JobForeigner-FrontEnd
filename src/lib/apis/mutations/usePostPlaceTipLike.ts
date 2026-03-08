import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface PostPlaceTipLikeResponse {
  success: string;
  data: null;
}

interface PostPlaceTipLikeParams {
  tipId: number;
  placeId: number;
}

const postPlaceTipLike = async ({ tipId }: PostPlaceTipLikeParams) => {
  return fetcher.post<PostPlaceTipLikeResponse>(`/api/v1/map/tips/${tipId}/like`);
};

const usePostPlaceTipLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['usePostPlaceTipLike'],
    mutationFn: postPlaceTipLike,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetPlaceTips', variables.placeId],
      });
    },
  });
};

export default usePostPlaceTipLike;
