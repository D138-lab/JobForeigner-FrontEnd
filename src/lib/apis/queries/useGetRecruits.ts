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

export const getRecruits = async ({
  queryKey,
}: {
  queryKey: [string, string?, string?, string?];
}) => {
  const [, companyName = '', region = 'ALL', employmentType = 'ALL'] = queryKey;

  const params = new URLSearchParams();

  if (companyName.trim() !== '') {
    params.append('companyName', companyName);
  }

  if (region.toUpperCase() !== 'ALL') {
    params.append('region', region);
  }

  if (employmentType.toUpperCase() !== 'ALL') {
    params.append('employmentType', employmentType);
  }

  const queryString = params.toString();
  const url = `/api/v1/job-posts${queryString ? `?${queryString}` : ''}`;

  const response = await fetcher.get<{
    success: boolean;
    data: GetRecruitsResponse;
  }>(url);

  return response;
};

const useGetRecruits = (
  companyName: string = '',
  region: string = 'ALL',
  employmentType: string = 'ALL',
) => {
  return useQuery({
    queryKey: ['getRecruits', companyName, region, employmentType],
    queryFn: getRecruits,
    staleTime: 1000 * 60,
    enabled: false,
  });
};

export default useGetRecruits;
