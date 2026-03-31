import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { GetDetailRecruitResponse } from './useGetDetailRecruitInfo';

export const getTranslatedJobPost = async ({
  queryKey,
}: {
  queryKey: [string, string | number, string];
}) => {
  const [, jobPostId, lang] = queryKey;

  return fetcher.get<{
    success: boolean | string;
    data: GetDetailRecruitResponse;
  }>(`/api/v1/job-posts/${jobPostId}/translations/${lang}`);
};

const useGetTranslatedJobPost = (
  jobPostId: string | number,
  lang?: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useGetTranslatedJobPost', jobPostId, lang ?? ''],
    queryFn: getTranslatedJobPost,
    enabled: enabled && !!lang,
  });
};

export default useGetTranslatedJobPost;
