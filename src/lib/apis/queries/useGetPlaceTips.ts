import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface PlaceTip {
  id: number;
  content: string;
  tipType: 'POSITIVE' | 'NEUTRAL' | 'WARNING';
  authorNickname: string;
  likeCount: number;
  createdAt: string;
  isMine?: boolean;
  isAuthor?: boolean;
  canDelete?: boolean;
}

interface GetPlaceTipsResponse {
  success: string;
  data: PlaceTip[];
}

const useGetPlaceTips = (placeId: number, enabled = true) => {
  return {
    ...useQuery({
      queryKey: ['useGetPlaceTips', placeId],
      queryFn: () =>
        fetcher.get<GetPlaceTipsResponse>(`/api/v1/map/places/${placeId}/tips`),
      enabled: enabled && Number.isFinite(placeId) && placeId > 0,
    }),
  };
};

export default useGetPlaceTips;
