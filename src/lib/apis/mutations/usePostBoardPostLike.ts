import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PostBoardPostLikeResponse {
  postId: number;
  likeCount: number;
  liked: boolean;
}

const postBoardPostLike = async (postId: number) => {
  return fetcher.post<{
    success: boolean | string;
    data: PostBoardPostLikeResponse;
  }>(`/api/v1/board-posts/${postId}/likes`);
};

const usePostBoardPostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBoardPostLike,
    mutationKey: ['postBoardPostLike'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPosts'] });
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPostDetail'] });
    },
  });
};

export default usePostBoardPostLike;
