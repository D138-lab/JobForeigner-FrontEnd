import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface PostNotificationsResponse {
  id: number;
  title: string;
  content: string;
  read: boolean;
}

const postNotifications = async (notificationId: number) => {
  const response = await fetcher.post<{
    success: boolean;
    data: PostNotificationsResponse;
  }>(`/api/v1/notifications/${notificationId}`);
  return response.data;
};

const usePostNotifications = () => {
  const queryClient = useQueryClient();

  return {
    ...useMutation({
      mutationKey: ['usePostNotifications'],
      mutationFn: postNotifications,
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: ['useGetAllNotifications'],
        });
        void queryClient.invalidateQueries({
          queryKey: ['useGetNotifications'],
        });
      },
      onError: error => {
        console.error('Post failed:', error);
      },
    }),
  };
};

export default usePostNotifications;
