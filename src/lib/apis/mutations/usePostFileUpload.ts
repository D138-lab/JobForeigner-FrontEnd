import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

export type FileType = 'COMPANY_IMAGE' | 'BOARD_POST_IMAGE' | string;

export interface PostFileUploadRequest {
  fileType: FileType;
  referenceId: number;
  fileName: string;
}

export interface PostFileUploadResponse {
  presignedUrl: string;
  objectName: string;
  expiryMinutes: number;
}

const postFileUpload = async (body: PostFileUploadRequest) => {
  return fetcher.post<{
    success: boolean | string;
    data: PostFileUploadResponse;
  }>('/api/v1/files/upload', body);
};

const usePostFileUpload = () =>
  useMutation({
    mutationFn: postFileUpload,
    mutationKey: ['postFileUpload'],
  });

export default usePostFileUpload;
