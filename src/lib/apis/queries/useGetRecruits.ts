import { RecruitInfoType } from '@/components/jobs/RecruitBox';
import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetRecruitsResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageSort: string;
  pageContents: RecruitInfoType[];
}

const useGetRecruits = () => {
  return {
    ...useQuery({
      queryKey: ['getRecruits'],
      queryFn: () =>
        fetcher.get<{ success: boolean; data: GetRecruitsResponse }>(
          '/api/v1/job-posts',
        ),
    }),
  };
};

export default useGetRecruits;
