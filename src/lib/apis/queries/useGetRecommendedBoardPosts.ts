import { fetcher } from '@/lib/fetcher';
import {
  BoardPostSummary,
  BoardPostsPageResponse,
} from './useGetBoardPosts';
import { useQuery } from '@tanstack/react-query';

const SUPPORTED_RECOMMENDATION_LANGUAGES = new Set([
  'en',
  'vi',
  'zh',
  'th',
  'id',
  'mn',
  'uz',
  'ne',
  'ru',
  'tl',
]);

export interface RecommendedBoardPostSummary extends BoardPostSummary {
  recommendationScore: number;
}

const resolveRecommendationLanguage = (language?: string) => {
  const normalizedLanguage = language?.toLowerCase().split('-')[0];

  if (
    normalizedLanguage &&
    SUPPORTED_RECOMMENDATION_LANGUAGES.has(normalizedLanguage)
  ) {
    return normalizedLanguage;
  }

  return undefined;
};

export const getRecommendedBoardPosts = async ({
  queryKey,
}: {
  queryKey: [string, number, number, string?];
}) => {
  const [, page = 0, size = 4, language] = queryKey;

  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());

  const resolvedLanguage = resolveRecommendationLanguage(language);

  if (resolvedLanguage) {
    params.append('lang', resolvedLanguage);
  }

  const response = await fetcher.get<{
    success: boolean | string;
    data: BoardPostsPageResponse<RecommendedBoardPostSummary>;
  }>(`/api/v1/board-posts/recommendations?${params.toString()}`);

  return response;
};

const useGetRecommendedBoardPosts = (
  page: number = 0,
  size: number = 4,
  language?: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useGetRecommendedBoardPosts', page, size, language],
    queryFn: getRecommendedBoardPosts,
    enabled,
  });
};

export default useGetRecommendedBoardPosts;
