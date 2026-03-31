import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { GetRecruitsResponse } from './useGetRecruits';

export interface RecommendedJobPost {
  id: number;
  title: string;
  companyName: string;
  description: string;
  regionType: string;
  employmentType: string;
  salary: string;
  career: string;
  published: string;
  grade: string;
  expiryAt: string;
  isScrapped: boolean;
  imageList: string[];
  recommendationScore: number;
}

export interface RecommendedJobPostsResponse
  extends Omit<GetRecruitsResponse, 'pageContents'> {
  pageContents: RecommendedJobPost[];
}

export const getRecommendedJobPosts = async ({
  queryKey,
}: {
  queryKey: [string, number, number, string[]];
}) => {
  const [, page = 0, size = 4, sort = ['recommend,desc']] = queryKey;

  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());

  sort.forEach(sortValue => {
    if (sortValue.trim() !== '') {
      params.append('sort', sortValue);
    }
  });

  const response = await fetcher.get<{
    success: boolean | string;
    data: RecommendedJobPostsResponse;
  }>(`/api/v1/job-posts/recommendations?${params.toString()}`);

  return response;
};

const useGetRecommendedJobPosts = (
  page: number = 0,
  size: number = 4,
  sort: string[] = ['recommend,desc'],
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['getRecommendedJobPosts', page, size, sort],
    queryFn: getRecommendedJobPosts,
    enabled,
  });
};

export default useGetRecommendedJobPosts;
