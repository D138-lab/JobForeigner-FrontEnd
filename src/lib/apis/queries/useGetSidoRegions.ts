import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface SidoRegion {
  regionCode: string;
  regionName: string;
  sido: string;
  sigungu: string;
  approximateCenter: {
    lat: number;
    lng: number;
  };
}

interface GetSidoRegionsResponse {
  success: string;
  data: SidoRegion[];
}

const useGetSidoRegions = (sido: string) => {
  return {
    ...useQuery({
      queryKey: ['useGetSidoRegions', sido],
      queryFn: () =>
        fetcher.get<GetSidoRegionsResponse>(
          `/api/v1/map/job-posts/sido/${encodeURIComponent(sido)}/regions`,
        ),
      enabled: !!sido,
    }),
  };
};

export default useGetSidoRegions;
