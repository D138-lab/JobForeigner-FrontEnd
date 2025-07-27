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

  const params = new URLSearchParams();
  if (region && region !== 'all') params.append('region', region);
  if (employmentType && employmentType !== 'all')
    params.append('employmentType', employmentType);

  const queryString = params.toString();
  const url = `/api/v1/job-posts${queryString ? `?${queryString}` : ''}`;

  const response = await fetcher.get<{
    success: boolean;
    data: GetRecruitsResponse;
  }>(url);

  return response;
};

const useGetRecruits = (
  region: string = 'all',
  employmentType: string = 'all',
) => {
  return useQuery({
    queryKey: ['getRecruits', region, employmentType],
    queryFn: getRecruits,
    staleTime: 1000 * 60,
  });
};

export default useGetRecruits;
