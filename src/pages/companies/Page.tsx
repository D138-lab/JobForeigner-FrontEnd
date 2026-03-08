import {
  getAllCompanyInfo,
  useGetAllCompanyInfo,
} from '@/lib/apis/queries/useGetCompanyApis';
import { useEffect, useState } from 'react';

import CompanyLists from '@/components/companies/CompanyLists';
import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import UnAuthorizedModal from '@/components/common/unauthorized/UnAuthorizedModal';
import styles from './page.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function CompaniesPage() {
  const { t } = useTranslation('pages');
  const [region, setRegion] = useState<string>('ALL');
  const [industryType, setIndustryType] = useState<string>('ALL');
  const [searchValue, setSearchValue] = useState<string>('');

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetAllCompanyInfo(
    searchValue,
    region,
    industryType,
  );

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['useAllCompanyInfo', searchValue, region, industryType],
      queryFn: () =>
        getAllCompanyInfo({
          queryKey: ['useAllCompanyInfo', searchValue, region, industryType],
        }),
    });
  }, []);

  const refetch = async (
    newSearchValue: string,
    newRegion: string,
    newIndustryType: string,
  ) => {
    setSearchValue(newSearchValue);
    setRegion(newRegion);
    setIndustryType(newIndustryType);

    await queryClient.fetchQuery({
      queryKey: [
        'useAllCompanyInfo',
        newSearchValue,
        newRegion,
        newIndustryType,
      ],
      queryFn: () =>
        getAllCompanyInfo({
          queryKey: [
            'useAllCompanyInfo',
            newSearchValue,
            newRegion,
            newIndustryType,
          ],
        }),
    });
  };

  return (
    <div className={styles.container}>
      <DetailSearchForm
        onClick={refetch}
        region={region}
        employmentType={industryType}
        value={searchValue}
        isForCompany={true}
      />
      {isLoading && <div>{t('companies.loading')}</div>}
      {isError && error.message === 'Request failed with status code 401' ? (
        <div className={styles.unAuthorizedModal}>
          <UnAuthorizedModal />
        </div>
      ) : data?.data.pageContents?.length ? (
        <CompanyLists data={data?.data} />
      ) : (
        <div>{t('companies.empty')}</div>
      )}
    </div>
  );
}
