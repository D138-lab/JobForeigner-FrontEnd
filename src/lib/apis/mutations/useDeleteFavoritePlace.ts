import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface DeleteFavoritePlaceResponse {
  success: string;
  data: null;
}

const deleteFavoritePlace = async (placeId: number) => {
  return fetcher.delete<DeleteFavoritePlaceResponse>(
    `/api/v1/map/favorites/places/${placeId}`,
  );
};

const useDeleteFavoritePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['useDeleteFavoritePlace'],
    mutationFn: deleteFavoritePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetMapFavorites'] });
    },
  });
};

export default useDeleteFavoritePlace;
