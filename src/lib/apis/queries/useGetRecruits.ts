import { RecruitInfoType } from '@/components/jobs/RecruitBox';
import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface GetRecruitsResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageSort: string;
  pageContents: RecruitInfoType[];
}

const getRecruits = async ({
  queryKey,
}: {
  queryKey: [string, string?, string?];
}) => {
  const [, region, employmentType] = queryKey;

  const regionParam = region ? `region=${region}` : '';
  const employmentParam = employmentType
    ? `employmentType=${employmentType}`
    : '';

  const params = [regionParam, employmentParam].filter(Boolean).join('&');

  const response = await fetcher.get<{
    success: boolean;
    data: GetRecruitsResponse;
  }>(`/api/v1/job-posts${params ? `?${params}` : ''}`);

  return response;
};

const useGetRecruits = (region?: string, employmentType?: string) => {
  return {
    ...useQuery({
      queryKey: ['getRecruits', region, employmentType],
      queryFn: getRecruits,
      enabled: true,
    }),
  };
};

export default useGetRecruits;
