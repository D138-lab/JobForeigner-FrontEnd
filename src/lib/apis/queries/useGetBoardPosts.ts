import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface BoardPostSummary {
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
}

export interface GetBoardPostsResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageSort: string;
  pageContents: BoardPostSummary[];
}

export const getBoardPosts = async ({
  queryKey,
}: {
  queryKey: [string, number, number, string[]?];
}) => {
  const [, page = 0, size = 12, sort = []] = queryKey;

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
    data: GetBoardPostsResponse;
  }>(`/api/v1/board-posts?${params.toString()}`);

  return response;
};

const useGetBoardPosts = (
  page: number = 0,
  size: number = 12,
  sort: string[] = [],
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useGetBoardPosts', page, size, sort],
    queryFn: getBoardPosts,
    enabled,
  });
};

export default useGetBoardPosts;
