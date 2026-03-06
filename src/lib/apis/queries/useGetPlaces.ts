import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export type PlaceCategoryCode =
  | 'HALAL_RESTAURANT'
  | 'ETHNIC_RESTAURANT'
  | 'ETHNIC_MART'
  | 'RELIGIOUS_FACILITY'
  | 'COMMUNITY_CENTER'
  | 'MONEY_TRANSFER'
  | 'OTHER';

export interface PlaceSearchCenter {
  regionCode: string;
  regionName: string;
  sido: string;
  sigungu: string;
  approximateCenter: {
    lat: number;
    lng: number;
  };
}

export interface PlaceItem {
  id: number;
  name: string;
  nameEn: string;
  category: PlaceCategoryCode;
  subCategory: string;
  countryAffinity: string;
  displayAddress: string;
  distanceFromCenter: number;
  tipCount: number;
  imageUrl: string;
  isVerified: boolean;
  lat?: number;
  lng?: number;
}

interface GetPlacesResponse {
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

interface GetPlacesParams {
  regionCode?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  categories?: PlaceCategoryCode[];
  countryAffinity?: string;
  page?: number;
  size?: number;
}

const buildQueryString = (params: GetPlacesParams) => {
  const searchParams = new URLSearchParams();
  if (params.regionCode) searchParams.set('regionCode', params.regionCode);
  if (params.lat !== undefined) searchParams.set('lat', String(params.lat));
  if (params.lng !== undefined) searchParams.set('lng', String(params.lng));
  if (params.radius !== undefined)
    searchParams.set('radius', String(params.radius));
  if (params.countryAffinity)
    searchParams.set('countryAffinity', params.countryAffinity);
  if (params.page !== undefined) searchParams.set('page', String(params.page));
  if (params.size !== undefined) searchParams.set('size', String(params.size));
  (params.categories ?? []).forEach(category =>
    searchParams.append('categories', category),
  );

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

const useGetPlaces = (params: GetPlacesParams, enabled = true) => {
  return {
    ...useQuery({
      queryKey: ['useGetPlaces', params],
      queryFn: () =>
        fetcher.get<GetPlacesResponse>(
          `/api/v1/map/places${buildQueryString(params)}`,
        ),
      enabled,
    }),
  };
};

export default useGetPlaces;
