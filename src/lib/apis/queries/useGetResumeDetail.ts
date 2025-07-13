import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetResumeDetailResponse {
  id: number;
  title: string;
  name: string;
  email: string;
  phoneNumber: string;
  imageUrl: string | null;
  createdAt: string;
}

const useGetResumeDetail = (resumeId: number) => {
  return {
    ...useQuery({
      queryKey: ['resumes', resumeId],
      queryFn: () =>
        fetcher.get<GetResumeDetailResponse>(`/api/v1/resumes/${resumeId}`),
      enabled: !!resumeId,
    }),
  };
};

export default useGetResumeDetail;
