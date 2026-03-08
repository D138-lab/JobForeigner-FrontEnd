import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface PostFavoritePlaceResponse {
  success: string;
  data: null;
}

interface PostFavoritePlaceRequest {
  placeId: number;
}

const postFavoritePlace = async (body: PostFavoritePlaceRequest) => {
  return fetcher.post<PostFavoritePlaceResponse>('/api/v1/map/favorites/places', body);
};

const usePostFavoritePlace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['usePostFavoritePlace'],
    mutationFn: postFavoritePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetMapFavorites'] });
    },
  });
};

export default usePostFavoritePlace;
