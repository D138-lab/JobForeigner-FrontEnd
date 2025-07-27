import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

const deleteNotifications = (notificationId: number) => {
  return fetcher.delete(`/api/v1/notifications/${notificationId}`);
};

const useDeleteNotifications = () => {
  return {
    ...useMutation({
      mutationKey: ['useDeleteNotifications'],
      mutationFn: deleteNotifications,
      onSuccess: () => {
        console.log('알림 삭제 성공');
      },
      onError: error => {
        console.error('알림 삭제 실패:', error);
      },
    }),
  };
};

export default useDeleteNotifications;
