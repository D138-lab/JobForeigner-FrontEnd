import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PostBoardPostCommentLikeParams {
  postId: number;
  commentId: number;
}

interface PostBoardPostCommentLikeResponse {
  commentId: number;
  likeCount: number;
  liked: boolean;
}

const postBoardPostCommentLike = async ({
  postId,
  commentId,
}: PostBoardPostCommentLikeParams) => {
  return fetcher.post<{
    success: boolean | string;
    data: PostBoardPostCommentLikeResponse;
  }>(`/api/v1/board-posts/${postId}/comments/${commentId}/likes`);
};

const usePostBoardPostCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBoardPostCommentLike,
    mutationKey: ['postBoardPostCommentLike'],
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetBoardPostComments', variables.postId],
      });
    },
  });
};

export default usePostBoardPostCommentLike;
