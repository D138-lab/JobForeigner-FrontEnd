import { fetcher } from '@/lib/fetcher';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export interface FavoritePlaceItem {
  id: number;
  placeId: number;
  placeName: string;
  placeCategory: string;
  displayAddress: string;
  createdAt: string;
}

export interface FavoriteRegionItem {
  id: number;
  regionCode: string;
  regionName: string;
  notifyNewJobPost: boolean;
  createdAt: string;
}

interface GetMapFavoritesResponse {
  success: string;
  data: {
    places: FavoritePlaceItem[];
    regions: FavoriteRegionItem[];
  };
}

const useGetMapFavorites = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);

  return {
    ...useQuery({
      queryKey: ['useGetMapFavorites'],
      queryFn: () =>
        fetcher.get<GetMapFavoritesResponse>('/api/v1/map/favorites'),
      enabled: isLoggedIn,
      staleTime: 1000 * 60,
    }),
  };
};

export default useGetMapFavorites;
