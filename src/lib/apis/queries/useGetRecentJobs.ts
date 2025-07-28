import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface GetRecentJobsResponse {
  jobPostId: number;
  title: string;
  companyName: string;
  regionType: string;
  recentTime: Date;
}

const useGetRecentJobs = () => {
  return {
    ...useQuery({
      queryKey: ['useGetRecentJobs'],
      queryFn: () =>
        fetcher.get<{ success: boolean; data: GetRecentJobsResponse[] }>(
          '/api/v1/job-posts/recent',
        ),
    }),
  };
};

export default useGetRecentJobs;
