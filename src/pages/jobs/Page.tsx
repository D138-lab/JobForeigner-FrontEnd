import useGetRecruits from '@/lib/apis/queries/useGetRecruits';

import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import Pagination from '@/components/common/pagination/Pagination';
import RecruitBox from '@/components/jobs/RecruitsBox';
import UnAuthorizedModal from '@/components/common/unauthorized/UnAuthorizedModal';
import styles from './page.module.scss';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/lib/stores/useAuthStore';

const PAGE_SIZE = 10;

const Page = () => {
  const { t } = useTranslation('pages');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [region, setRegion] = useState('all');
  const [employmentType, setEmploymentType] = useState('all');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isError, error } = useGetRecruits(
    searchValue,
    region,
    employmentType,
    currentPage,
    PAGE_SIZE,
    isLoggedIn,
  );
  const isUnauthorized =
    !isLoggedIn || error?.message === 'Request failed with status code 401';

  const refetch = (
    newSearchValue: string,
    newRegion: string,
    newEmploymentType: string,
  ) => {
    setSearchValue(newSearchValue);
    setRegion(newRegion);
    setEmploymentType(newEmploymentType);
    setCurrentPage(0);
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
            <>
              <RecruitBox data={data?.data} />
              <Pagination
                currentPage={data.data.pageNumber}
                totalPages={data.data.totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <div>{t('jobs.empty')}</div>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
