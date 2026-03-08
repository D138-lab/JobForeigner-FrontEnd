import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

export interface PostFileUploadConfirmRequest {
  fileName: string;
  objectName: string;
  fileSize: number;
  fileType: string;
  referenceId: number;
  contentType: string;
}

export interface PostFileUploadConfirmData {
  imageFileId?: number;
  fileId?: number;
  id?: number;
}

const postFileUploadConfirm = async (body: PostFileUploadConfirmRequest) => {
  return fetcher.post<{
    success: boolean | string;
    data: PostFileUploadConfirmData | number | null;
  }>('/api/v1/files/upload/confirm', body);
};

const usePostFileUploadConfirm = () =>
  useMutation({
    mutationFn: postFileUploadConfirm,
    mutationKey: ['postFileUploadConfirm'],
  });

export default usePostFileUploadConfirm;
