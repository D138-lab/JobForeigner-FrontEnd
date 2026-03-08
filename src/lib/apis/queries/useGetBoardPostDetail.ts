import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface BoardPostDetailResponse {
  postId: number;
  title: string;
  content: string;
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
  tags: string[];
  imagePaths: string[];
  createdAt: string;
  updatedAt: string;
}

export const getBoardPostDetail = async ({
  queryKey,
}: {
  queryKey: [string, number];
}) => {
  const [, postId] = queryKey;

  const response = await fetcher.get<{
    success: boolean | string;
    data: BoardPostDetailResponse;
  }>(`/api/v1/board-posts/${postId}`);

  return response;
};

const useGetBoardPostDetail = (postId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: ['useGetBoardPostDetail', postId],
    queryFn: getBoardPostDetail,
    enabled,
  });
};

export default useGetBoardPostDetail;
