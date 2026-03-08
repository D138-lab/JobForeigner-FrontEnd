import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';
import { PlaceTip } from '../queries/useGetPlaceTips';

export type PlaceTipType = 'POSITIVE' | 'NEUTRAL' | 'WARNING';

export interface PostPlaceTipRequest {
  content: string;
  tipType: PlaceTipType;
  isAnonymous: boolean;
}

interface PostPlaceTipResponse {
  success: string;
  data: PlaceTip;
}

interface PostPlaceTipParams {
  placeId: number;
  body: PostPlaceTipRequest;
}

const postPlaceTip = async ({ placeId, body }: PostPlaceTipParams) => {
  return fetcher.post<PostPlaceTipResponse>(
    `/api/v1/map/places/${placeId}/tips`,
    body,
  );
};

const usePostPlaceTip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['usePostPlaceTip'],
    mutationFn: postPlaceTip,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetPlaceTips', variables.placeId],
      });
      queryClient.invalidateQueries({
        queryKey: ['useGetPlaceDetail', variables.placeId],
      });
    },
  });
};

export default usePostPlaceTip;
