import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteBoardPostLikeResponse {
  postId: number;
  likeCount: number;
  liked: boolean;
}

const deleteBoardPostLike = async (postId: number) => {
  return fetcher.delete<{
    success: boolean | string;
    data: DeleteBoardPostLikeResponse;
  }>(`/api/v1/board-posts/${postId}/likes`);
};

const useDeleteBoardPostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoardPostLike,
    mutationKey: ['deleteBoardPostLike'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPosts'] });
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPostDetail'] });
    },
  });
};

export default useDeleteBoardPostLike;
