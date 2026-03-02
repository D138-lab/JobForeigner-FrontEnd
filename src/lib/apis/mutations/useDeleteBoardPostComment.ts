import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteBoardPostCommentParams {
  postId: number;
  commentId: number;
}

const deleteBoardPostComment = async ({
  postId,
  commentId,
}: DeleteBoardPostCommentParams) => {
  return fetcher.delete<{ success: boolean | string; data: null }>(
    `/api/v1/board-posts/${postId}/comments/${commentId}`,
  );
};

const useDeleteBoardPostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoardPostComment,
    mutationKey: ['deleteBoardPostComment'],
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetBoardPostComments', variables.postId],
      });
    },
  });
};

export default useDeleteBoardPostComment;
