import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteBoardPost = async (postId: number) => {
  return fetcher.delete<{ success: boolean | string; data: null }>(
    `/api/v1/board-posts/${postId}`,
  );
};

const useDeleteBoardPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBoardPost,
    mutationKey: ['deleteBoardPost'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPosts'] });
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPostDetail'] });
    },
  });
};

export default useDeleteBoardPost;
