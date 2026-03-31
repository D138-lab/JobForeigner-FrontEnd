import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';
import { GetCompanyDetailInfoResponse } from './useGetCompanyApis';

export const getTranslatedCompany = async ({
  queryKey,
}: {
  queryKey: [string, number, string];
}) => {
  const [, companyId, lang] = queryKey;

  return fetcher.get<{
    success: boolean | string;
    data: GetCompanyDetailInfoResponse;
  }>(`/api/v1/companies/${companyId}/translations/${lang}`);
};

const useGetTranslatedCompany = (
  companyId: number,
  lang?: string,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useGetTranslatedCompany', companyId, lang ?? ''],
    queryFn: getTranslatedCompany,
    enabled: enabled && !!lang,
  });
};

export default useGetTranslatedCompany;
