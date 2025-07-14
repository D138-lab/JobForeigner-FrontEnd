import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

interface postApplyRecruitProps {
  jobPostId: number;
  resumeId: number;
}

const postApplyRecruit = async ({
  resumeId,
  jobPostId,
}: postApplyRecruitProps) => {
  return await fetcher.post(
    `/api/v1/job-posts/jobPost/${resumeId}/${jobPostId}/apply`,
  );
};

const usePostApplyRecruit = () =>
  useMutation({
    mutationFn: postApplyRecruit,
    mutationKey: ['postApplyRecruit'],
    onSuccess: data => {
      console.log('Post successful:', data);
    },
    onError: error => {
      console.error('Post failed:', error);
    },
  });

export default usePostApplyRecruit;
