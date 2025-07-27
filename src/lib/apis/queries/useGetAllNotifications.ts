import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetAllNotificationsResponse {
  id: number;
  title: string;
  content: string;
  read: boolean;
}

const useGetAllNotifications = () => {
  return {
    ...useQuery({
      queryKey: ['useGetAllNotifications'],
      queryFn: () =>
        fetcher.get<{ success: boolean; data: GetAllNotificationsResponse[] }>(
          '/api/v1/notifications/recent',
        ),
    }),
  };
};

export default useGetAllNotifications;
