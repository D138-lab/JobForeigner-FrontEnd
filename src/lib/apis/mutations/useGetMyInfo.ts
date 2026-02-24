import { END_POINTS } from '@/lib/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';

export interface MyInfoResponse {
  name: string;
  type: 'FOREIGNER' | 'COMPANY' | 'ADMIN' | 'NONE';
  phoneNumber: string;
  email: string;
  profile_image_url: string;
  address: {
    address: string;
    detailAddress: string;
    zipcode: string;
  };
}

export const getMyInfo = async (): Promise<MyInfoResponse> => {
  const response = await fetcher.get<MyInfoResponse>(END_POINTS.MY_INFO);
  return response;
};

const useGetMyInfo = () => {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  return {
    ...useQuery({
      queryKey: ['myInfo'],
      queryFn: getMyInfo,
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      enabled: isLoggedIn,
      retry: false,
    }),
  };
};

export default useGetMyInfo;
