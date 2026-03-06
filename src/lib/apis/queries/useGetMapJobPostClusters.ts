import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface MapJobPostCluster {
  regionCode: string;
  regionName: string;
  center: {
    lat: number;
    lng: number;
  };
  jobPostCount: number;
  topCompanies: string[];
}

interface GetMapJobPostClustersResponse {
  success: string;
  data: {
    clusters: MapJobPostCluster[];
    totalJobPosts: number;
  };
}

const useGetMapJobPostClusters = (sido?: string) => {
  return {
    ...useQuery({
      queryKey: ['useGetMapJobPostClusters', sido],
      queryFn: () =>
        fetcher.get<GetMapJobPostClustersResponse>(
          `/api/v1/map/job-posts${sido ? `?sido=${encodeURIComponent(sido)}` : ''}`,
        ),
      enabled: !!sido,
    }),
  };
};

export default useGetMapJobPostClusters;
