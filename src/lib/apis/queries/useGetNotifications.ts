import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetNotificationsResponse {
  data: string;
}

const useGetNotifications = () => {
  return {
    ...useQuery({
      queryKey: ['useGetNotifications'],
      queryFn: () =>
        fetcher.get<{ success: boolean; data: GetNotificationsResponse }>(
          '/api/v1/notifications',
        ),
    }),
  };
};

export default useGetNotifications;
