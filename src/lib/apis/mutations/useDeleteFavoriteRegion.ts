import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface DeleteFavoriteRegionResponse {
  success: string;
  data: null;
}

const deleteFavoriteRegion = async (regionCode: string) => {
  return fetcher.delete<DeleteFavoriteRegionResponse>(
    `/api/v1/map/favorites/regions/${regionCode}`,
  );
};

const useDeleteFavoriteRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['useDeleteFavoriteRegion'],
    mutationFn: deleteFavoriteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetMapFavorites'] });
    },
  });
};

export default useDeleteFavoriteRegion;
