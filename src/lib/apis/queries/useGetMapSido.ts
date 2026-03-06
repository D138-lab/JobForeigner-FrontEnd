import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetMapSidoResponse {
  success: string;
  data: string[];
}

const useGetMapSido = () => {
  return {
    ...useQuery({
      queryKey: ['useGetMapSido'],
      queryFn: () =>
        fetcher.get<GetMapSidoResponse>('/api/v1/map/job-posts/sido'),
    }),
  };
};

export default useGetMapSido;
