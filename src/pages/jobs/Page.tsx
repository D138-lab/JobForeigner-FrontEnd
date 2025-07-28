import useGetRecruits, { getRecruits } from '@/lib/apis/queries/useGetRecruits';

import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import RecruitBox from '@/components/jobs/RecruitsBox';
import styles from './page.module.scss';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const Page = () => {
  const [region, setRegion] = useState('all');
  const [employmentType, setEmploymentType] = useState('all');
  const [searchValue, setSearchValue] = useState<string>('');

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetRecruits(
    searchValue,
    region,
    employmentType,
  );

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ['getRecruits', searchValue, region, employmentType],
      queryFn: () =>
        getRecruits({
          queryKey: ['getRecruits', searchValue, region, employmentType],
        }),
    });
  }, []);

  const refetch = async (
    newSearchValue: string,
    newRegion: string,
    newEmploymentType: string,
  ) => {
    setSearchValue(newSearchValue);
    setRegion(newRegion);
    setEmploymentType(newEmploymentType);

    await queryClient.fetchQuery({
      queryKey: ['getRecruits', newSearchValue, newRegion, newEmploymentType],
      queryFn: () =>
        getRecruits({
          queryKey: [
            'getRecruits',
            newSearchValue,
            newRegion,
            newEmploymentType,
          ],
        }),
    });
  };

  return (
    <div className={styles.container}>
      <DetailSearchForm
        onClick={refetch}
        region={region}
        employmentType={employmentType}
        value={searchValue}
        isForCompany={false}
      />
      {isLoading && <div>로딩 중...</div>}
      {isError && <div>에러 발생: {error.message}</div>}
      {data?.data.pageContents?.length ? (
        <RecruitBox data={data?.data} />
      ) : (
        <div>공고가 없습니다.</div>
      )}
    </div>
  );
};

export default Page;
