import { PlaceItem, PlaceSearchCenter } from './useGetPlaces';
import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface SearchPlacesResponse {
  success: string;
  data: {
    searchCenter: PlaceSearchCenter;
    places: PlaceItem[];
    totalElements: number;
    totalPages: number;
    currentPage: number;
    size: number;
  };
}

const useSearchPlaces = (
  keyword: string,
  page = 0,
  size = 20,
  enabled = true,
) => {
  const normalizedKeyword = keyword.trim();

  return {
    ...useQuery({
      queryKey: ['useSearchPlaces', normalizedKeyword, page, size],
      queryFn: () =>
        fetcher.get<SearchPlacesResponse>(
          `/api/v1/map/places/search?keyword=${encodeURIComponent(
            normalizedKeyword,
          )}&page=${page}&size=${size}`,
        ),
      enabled: enabled && normalizedKeyword.length > 0,
    }),
  };
};

export default useSearchPlaces;
