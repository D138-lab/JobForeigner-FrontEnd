import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

const useGetNotifications = () => {
  return {
    ...useQuery({
      queryKey: ['useGetNotifications'],
      queryFn: () =>
        fetcher.get<{ success: boolean; data: number }>(
          '/api/v1/notifications',
        ),
    }),
  };
};

export default useGetNotifications;
