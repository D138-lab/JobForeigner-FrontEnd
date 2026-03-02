import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface PostBoardPostRequest {
  title: string;
  content: string;
  boardCategoryType: string;
  categoryCode: string;
  tags: string[];
  imageFileIds: number[];
}

interface PostBoardPostResponse {
  success: boolean | string;
  data: string;
}

const postBoardPost = async (body: PostBoardPostRequest) => {
  return fetcher.post<PostBoardPostResponse>('/api/v1/board-posts', body);
};

const usePostBoardPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postBoardPost,
    mutationKey: ['postBoardPost'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetBoardPosts'] });
    },
  });
};

export default usePostBoardPost;
