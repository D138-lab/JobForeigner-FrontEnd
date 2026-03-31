import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { BoardPostComment } from './useGetBoardPostComments';

export const getTranslatedBoardPostComment = async ({
  queryKey,
}: {
  queryKey: [string, number, number, string];
}) => {
  const [, postId, commentId, lang] = queryKey;

  return fetcher.get<{
    success: boolean | string;
    data: BoardPostComment;
  }>(`/api/v1/board-posts/${postId}/comments/${commentId}/translations/${lang}`);
};

const useGetTranslatedBoardPostComment = (
  postId: number,
  commentId: number,
  lang?: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: [
      'useGetTranslatedBoardPostComment',
      postId,
      commentId,
      lang ?? '',
    ],
    queryFn: getTranslatedBoardPostComment,
    enabled: enabled && !!lang,
  });
};

export default useGetTranslatedBoardPostComment;
