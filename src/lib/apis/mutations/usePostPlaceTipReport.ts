import { useMutation } from '@tanstack/react-query';

import { fetcher } from '@/lib/fetcher';

interface PostPlaceTipReportResponse {
  success: string;
  data: null;
}

interface PostPlaceTipReportParams {
  tipId: number;
}

const postPlaceTipReport = async ({ tipId }: PostPlaceTipReportParams) => {
  return fetcher.post<PostPlaceTipReportResponse>(`/api/v1/map/tips/${tipId}/report`);
};

const usePostPlaceTipReport = () => {
  return useMutation({
    mutationKey: ['usePostPlaceTipReport'],
    mutationFn: postPlaceTipReport,
  });
};

export default usePostPlaceTipReport;
