import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { BoardPostDetailResponse } from './useGetBoardPostDetail';

export const getTranslatedBoardPost = async ({
  queryKey,
}: {
  queryKey: [string, number, string];
}) => {
  const [, postId, lang] = queryKey;

  return fetcher.get<{
    success: boolean | string;
    data: BoardPostDetailResponse;
  }>(`/api/v1/board-posts/${postId}/translations/${lang}`);
};

const useGetTranslatedBoardPost = (
  postId: number,
  lang?: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useGetTranslatedBoardPost', postId, lang ?? ''],
    queryFn: getTranslatedBoardPost,
    enabled: enabled && !!lang,
  });
};

export default useGetTranslatedBoardPost;
