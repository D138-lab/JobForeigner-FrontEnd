import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PostBoardPostCommentRequest {
  content: string;
}

interface PostBoardPostCommentResponse {
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

interface PostBoardPostCommentParams {
  postId: number;
  body: PostBoardPostCommentRequest;
}

const postBoardPostComment = async ({
  postId,
  body,
}: PostBoardPostCommentParams) => {
  return fetcher.post<{
    success: boolean | string;
    data: PostBoardPostCommentResponse;
  }>(`/api/v1/board-posts/${postId}/comments`, body);
};

const usePostBoardPostComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBoardPostComment,
    mutationKey: ['postBoardPostComment'],
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['useGetBoardPostComments', variables.postId],
      });
    },
  });
};

export default usePostBoardPostComment;
