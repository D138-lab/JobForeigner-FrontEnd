import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface PostFavoriteRegionResponse {
  success: string;
  data: null;
}

interface PostFavoriteRegionRequest {
  regionCode: string;
  regionName: string;
  notifyNewJobPost: boolean;
}

const postFavoriteRegion = async (body: PostFavoriteRegionRequest) => {
  return fetcher.post<PostFavoriteRegionResponse>('/api/v1/map/favorites/regions', body);
};

const usePostFavoriteRegion = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['usePostFavoriteRegion'],
    mutationFn: postFavoriteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetMapFavorites'] });
    },
  });
};

export default usePostFavoriteRegion;
