import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface DeletePlaceTipResponse {
  success: string;
  data: null;
}

interface DeletePlaceTipParams {
  tipId: number;
  placeId: number;
}

const deletePlaceTip = async ({ tipId }: DeletePlaceTipParams) => {
  return fetcher.delete<DeletePlaceTipResponse>(`/api/v1/map/tips/${tipId}`);
};

const useDeletePlaceTip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['useDeletePlaceTip'],
    mutationFn: deletePlaceTip,
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

export default useDeletePlaceTip;
