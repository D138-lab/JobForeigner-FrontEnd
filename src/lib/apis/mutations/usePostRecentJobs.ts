import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

const postRecentJobs = async (jobPostId: number) => {
  try {
    const response = await fetcher.post<{ success: boolean; data: string }>(
      `/api/v1/job-posts/recent/${jobPostId}`,
    );
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

const usePostRecentJobs = () => {
  return {
    ...useMutation({
      mutationFn: postRecentJobs,
      mutationKey: ['usePostRecentJobs'],
      onSuccess: () => {
        console.log('최근 본 공고 추가 성공');
      },
      onError: error => {
        console.error('최근 본 공고 추가 실패:', error);
      },
    }),
  };
};

export default usePostRecentJobs;
