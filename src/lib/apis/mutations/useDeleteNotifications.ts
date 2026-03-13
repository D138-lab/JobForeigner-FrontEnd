import { fetcher } from '@/lib/fetcher';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteNotifications = (notificationId: number) => {
  return fetcher.delete(`/api/v1/notifications/${notificationId}`);
};

const useDeleteNotifications = () => {
  const queryClient = useQueryClient();

  return {
    ...useMutation({
      mutationKey: ['useDeleteNotifications'],
      mutationFn: deleteNotifications,
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: ['useGetAllNotifications'],
        });
        void queryClient.invalidateQueries({
          queryKey: ['useGetNotifications'],
        });
      },
      onError: error => {
        console.error('알림 삭제 실패:', error);
      },
    }),
  };
};

export default useDeleteNotifications;
