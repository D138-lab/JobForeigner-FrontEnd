import useGetRecruits, { getRecruits } from '@/lib/apis/queries/useGetRecruits';

import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import RecruitBox from '@/components/jobs/RecruitsBox';
import UnAuthorizedModal from '@/components/common/unauthorized/UnAuthorizedModal';
import styles from './page.module.scss';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/lib/stores/useAuthStore';

const Page = () => {
  const { t } = useTranslation('pages');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [region, setRegion] = useState('all');
  const [employmentType, setEmploymentType] = useState('all');
  const [searchValue, setSearchValue] = useState<string>('');

  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useGetRecruits(
    searchValue,
    region,
    employmentType,
  );
  const isUnauthorized =
    !isLoggedIn || error?.message === 'Request failed with status code 401';

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
      {isUnauthorized && (
        <div className={styles.unAuthorizedModal}>
          <UnAuthorizedModal />
        </div>
      )}
      <DetailSearchForm
        onClick={refetch}
        region={region}
        employmentType={employmentType}
        value={searchValue}
        isForCompany={false}
      />
      {isLoading && <div>{t('jobs.loading')}</div>}
      {isError && !isUnauthorized ? (
        <div>{error.message}</div>
      ) : (
        <>
          {data?.data.pageContents?.length ? (
            <RecruitBox data={data?.data} />
          ) : (
            <div>{t('jobs.empty')}</div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
