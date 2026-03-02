import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteBoardPostCommentLikeParams {
  postId: number;
  commentId: number;
}

interface DeleteBoardPostCommentLikeResponse {
  commentId: number;
  likeCount: number;
  liked: boolean;
}

const deleteBoardPostCommentLike = async ({
  postId,
  commentId,
}: DeleteBoardPostCommentLikeParams) => {
  return fetcher.delete<{
    success: boolean | string;
    data: DeleteBoardPostCommentLikeResponse;
  }>(`/api/v1/board-posts/${postId}/comments/${commentId}/likes`);
};

const useDeleteBoardPostCommentLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoardPostCommentLike,
    mutationKey: ['deleteBoardPostCommentLike'],
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetBoardPostComments', variables.postId],
      });
    },
  });
};

export default useDeleteBoardPostCommentLike;
