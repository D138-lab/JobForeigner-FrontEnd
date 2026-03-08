import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface BoardPostComment {
  commentId: number;
  content: string;
  memberId: number;
  memberNickname: string;
  memberCountryCode: string;
  postId: number;
  likeCount: number;
  likedByMe: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetBoardPostCommentsResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageSort: string;
  pageContents: BoardPostComment[];
}

export const getBoardPostComments = async ({
  queryKey,
}: {
  queryKey: [string, number, number, number, string[]?];
}) => {
  const [, postId, page = 0, size = 12, sort = []] = queryKey;

  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());

  sort.forEach(sortOption => {
    if (sortOption.trim() !== '') {
      params.append('sort', sortOption);
    }
  });

  const response = await fetcher.get<{
    success: boolean | string;
    data: GetBoardPostCommentsResponse;
  }>(`/api/v1/board-posts/${postId}/comments?${params.toString()}`);

  return response;
};

const useGetBoardPostComments = (
  postId: number,
  page: number = 0,
  size: number = 12,
  sort: string[] = [],
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useGetBoardPostComments', postId, page, size, sort],
    queryFn: getBoardPostComments,
    enabled,
  });
};

export default useGetBoardPostComments;
