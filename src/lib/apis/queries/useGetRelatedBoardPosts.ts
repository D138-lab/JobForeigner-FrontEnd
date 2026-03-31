import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface RelatedBoardPostSummary {
  postId: number;
  title: string;
  memberId: number;
  memberNickname: string;
  memberCountryCode: string;
  boardCategoryId: number;
  boardCategoryName: string;
  boardCategoryType: string;
  categoryId: number;
  categoryCode: string;
  categoryName: string;
  published: boolean;
  likeCount: number;
  likedByMe: boolean;
  commentCount: number;
  tags: string[];
  imagePaths: string[];
  createdAt: string;
  recommendationScore: number;
}

export const getRelatedBoardPosts = async ({
  queryKey,
}: {
  queryKey: [string, number, number];
}) => {
  const [, postId, limit = 5] = queryKey;

  const params = new URLSearchParams();
  params.append('limit', Math.min(limit, 10).toString());

  const response = await fetcher.get<{
    success: boolean | string;
    data: RelatedBoardPostSummary | RelatedBoardPostSummary[];
  }>(`/api/v1/board-posts/${postId}/related?${params.toString()}`);

  return {
    ...response,
    data: Array.isArray(response.data) ? response.data : [response.data],
  };
};

const useGetRelatedBoardPosts = (
  postId: number,
  limit: number = 5,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useGetRelatedBoardPosts', postId, limit],
    queryFn: getRelatedBoardPosts,
    enabled,
  });
};

export default useGetRelatedBoardPosts;
