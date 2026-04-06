import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface JobPostApplication {
  jobPostId: number;
  title: string;
  companyName: string;
  address: string;
  applicationDate: string;
  applicationStatus: 'APPLIED' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED';
  resumeName: string;
}

export const getJobPostApplications = async () => {
  return fetcher.get<{
    success: boolean | string;
    data: JobPostApplication[];
  }>('/api/v1/job-posts/applications');
};

const useGetJobPostApplications = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['useGetJobPostApplications'],
    queryFn: getJobPostApplications,
    enabled,
  });
};

export default useGetJobPostApplications;
