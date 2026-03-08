import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface PatchFavoriteRegionNotificationResponse {
  success: string;
  data: null;
}

const patchFavoriteRegionNotification = async (regionCode: string) => {
  return fetcher.patch<PatchFavoriteRegionNotificationResponse>(
    `/api/v1/map/favorites/regions/${regionCode}/notification`,
  );
};

const usePatchFavoriteRegionNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['usePatchFavoriteRegionNotification'],
    mutationFn: patchFavoriteRegionNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetMapFavorites'] });
    },
  });
};

export default usePatchFavoriteRegionNotification;
