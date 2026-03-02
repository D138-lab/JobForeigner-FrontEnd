import { useMutation, useQueryClient } from '@tanstack/react-query';

import { BoardPostDetailResponse } from '@/lib/apis/queries/useGetBoardPostDetail';
import { fetcher } from '@/lib/fetcher';

export interface PatchBoardPostRequest {
  title: string;
  content: string;
  categoryCode: string;
  tags: string[];
  imageFileIds: number[];
}

interface PatchBoardPostParams {
  postId: number;
  body: PatchBoardPostRequest;
}

const patchBoardPost = async ({ postId, body }: PatchBoardPostParams) => {
  return fetcher.patch<{
    success: boolean | string;
    data: BoardPostDetailResponse;
  }>(`/api/v1/board-posts/${postId}`, body);
};

const usePatchBoardPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: patchBoardPost,
    mutationKey: ['patchBoardPost'],
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPosts'] });
      queryClient.invalidateQueries({
        queryKey: ['useGetBoardPostDetail', variables.postId],
      });
    },
  });
};

export default usePatchBoardPost;
