import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetUserProfileInfoResponse {
  name: string;
  type: string;
  phoneNumber: string;
  email: string;
  profileImageUrl: string;
}

const useGetUserProfileInfo = () => {
  return {
    ...useQuery({
      queryKey: ['userProfileInfo'],
      queryFn: () =>
        fetcher.get<GetUserProfileInfoResponse>('/api/v1/members/me'),
    }),
  };
};

export default useGetUserProfileInfo;
