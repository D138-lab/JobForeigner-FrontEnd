import {
  getAllCompanyInfo,
  useGetAllCompanyInfo,
} from '@/lib/apis/queries/useGetCompanyApis';
import { useEffect, useState } from 'react';

import CompanyLists from '@/components/companies/CompanyLists';
import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import styles from './page.module.scss';
import { useQueryClient } from '@tanstack/react-query';

export default function CompaniesPage() {
  const [region, setRegion] = useState<string>('ALL');
  const [industryType, setIndustryType] = useState<string>('ALL');
  const [searchValue, setSearchValue] = useState<string>('');

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetAllCompanyInfo();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['useAllCompanyInfo', searchValue, region, industryType],
      queryFn: () =>
        getAllCompanyInfo({
          queryKey: ['getAllCompanyInfo', searchValue, region, industryType],
        }),
    });
  });

  const refetch = async (
    newSearchValue: string,
    newRegion: string,
    newIndustryType: string,
  ) => {
    setSearchValue(newSearchValue);
    setRegion(newRegion);
    setIndustryType(newIndustryType);

    await queryClient.fetchQuery({
      queryKey: ['getRecruits', newSearchValue, newRegion, newIndustryType],
      queryFn: () =>
        getAllCompanyInfo({
          queryKey: ['getRecruits', newSearchValue, newRegion, newIndustryType],
        }),
    });
  };

  if (isLoading) console.log('로딩 중');
  if (isError) console.log('에러 발생', error);
  return (
    <div className={styles.container}>
      <DetailSearchForm
        onClick={refetch}
        region={region}
        employmentType={industryType}
        value={searchValue}
        isForCompany={true}
      />
      <CompanyLists data={data?.data} />
    </div>
  );
}
