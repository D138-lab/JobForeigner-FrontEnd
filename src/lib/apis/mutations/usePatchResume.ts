import { useMutation } from '@tanstack/react-query';
import { instance } from '@/lib/fetcher';
import { PostResumeRequest } from './usePostResume'; // 동일한 타입 사용
import { END_POINTS } from '@/lib/constants/routes';

const patchResume = async ({
  resumeId,
  body,
}: {
  resumeId: number;
  body: PostResumeRequest;
}) => {
  const response = await instance.patch(`/api/v1/resumes/${resumeId}`, body);
  return response.data;
};

const usePatchResume = () =>
  useMutation({
    mutationFn: patchResume,
    mutationKey: ['patchResume'],
    onSuccess: data => {
      console.log('이력서 수정 성공:', data);
      return data;
    },
    onError: error => {
      console.error('이력서 수정 실패:', error);
      return error;
    },
  });

export default usePatchResume;
