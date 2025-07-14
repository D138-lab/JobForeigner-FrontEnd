import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetDetailRecruitResponse {
  id: number;
  title: string;
  companyId: number;
  companyName: string;
  description: string;
  location: string;
  employmentType: string;
  salary: string;
  career: string;
  published: string;
  grade: string;
  isScrapped: boolean;
  expiryAt: Date;
}

const useGetDetailRecruitInfo = (id: string) => {
  return {
    ...useQuery({
      queryKey: ['getDetailRecruitInfo', id],
      queryFn: () =>
        fetcher.get<{ success: boolean; data: GetDetailRecruitResponse }>(
          `https://jb.d138.patulus.com:8080/api/v1/job-posts/${id}`,
        ),
    }),
  };
};

export default useGetDetailRecruitInfo;
