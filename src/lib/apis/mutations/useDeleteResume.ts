import { useMutation, useQueryClient } from '@tanstack/react-query';
import { instance } from '@/lib/fetcher';

const deleteResume = async (resumeId: number) => {
  const response = await instance.delete(`/api/v1/resumes/${resumeId}`);
  return response.data;
};

const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteResume,
    mutationKey: ['deleteResume'],
    onSuccess: () => {
      console.log('이력서 삭제 성공');
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
    },
    onError: error => {
      console.error('이력서 삭제 실패:', error);
    },
  });
};

export default useDeleteResume;
