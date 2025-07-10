import { fetcher } from '@/lib/fetcher';
import { ResumeValues } from '@/lib/schemas/resumeSchema';
import { useMutation } from '@tanstack/react-query';

const postCreateResume = async (body: ResumeValues) => {
  const formData = new FormData();
  formData.append('resume', JSON.stringify(body));

  return fetcher.post<ResumeValues>('/api/v1/resumes/create', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

const usePostCreateResume = () =>
  useMutation({
    mutationFn: postCreateResume,
    mutationKey: ['createResume'],
    onSuccess: data => {
      console.log('Post successful:', data);
    },
    onError: error => {
      console.error('Post failed:', error);
    },
  });

export default usePostCreateResume;
