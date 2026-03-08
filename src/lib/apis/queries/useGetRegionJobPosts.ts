import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface RegionJobPost {
  id: number;
  title: string;
  companyName: string;
  employmentType: 'FULL_TIME' | 'PART_TIME' | 'CONTRACT' | 'INTERN' | 'ETC';
  salary: string;
  expiryAt: string;
  displayLocation: string;
}

interface GetRegionJobPostsResponse {
  success: string;
  data: RegionJobPost[];
}

export const getRegionJobPosts = (regionCode: string) => {
  return fetcher.get<GetRegionJobPostsResponse>(
    `/api/v1/map/job-posts/regions/${encodeURIComponent(regionCode)}`,
  );
};

const useGetRegionJobPosts = (regionCode: string, enabled = true) => {
  return {
    ...useQuery({
      queryKey: ['useGetRegionJobPosts', regionCode],
      queryFn: () => getRegionJobPosts(regionCode),
      enabled: enabled && !!regionCode,
    }),
  };
};

export default useGetRegionJobPosts;
