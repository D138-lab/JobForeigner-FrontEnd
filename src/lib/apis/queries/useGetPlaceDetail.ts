import { fetcher } from '@/lib/fetcher';
import { PlaceCategoryCode } from './useGetPlaces';
import { useQuery } from '@tanstack/react-query';

export interface PlaceTip {
  id: number;
  content: string;
  tipType: 'POSITIVE' | 'NEUTRAL' | 'WARNING';
  authorNickname: string;
  likeCount: number;
  createdAt: string;
}

export interface PlaceDetail {
  id: number;
  name: string;
  nameEn: string;
  category: PlaceCategoryCode;
  subCategory: string;
  countryAffinity: string;
  religionType: string;
  displayAddress: string;
  phoneNumber: string;
  operatingHours: string;
  description: string;
  imageUrl: string;
  isVerified: boolean;
  tips: PlaceTip[];
  tipSummary: {
    total: number;
    positive: number;
    neutral: number;
    warning: number;
  };
}

interface GetPlaceDetailResponse {
  success: string;
  data: PlaceDetail;
}

const useGetPlaceDetail = (placeId: number, enabled = true) => {
  return {
    ...useQuery({
      queryKey: ['useGetPlaceDetail', placeId],
      queryFn: () =>
        fetcher.get<GetPlaceDetailResponse>(`/api/v1/map/places/${placeId}`),
      enabled: enabled && Number.isFinite(placeId) && placeId > 0,
    }),
  };
};

export default useGetPlaceDetail;
