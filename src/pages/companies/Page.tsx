import {
  useGetAllCompanyInfo,
} from '@/lib/apis/queries/useGetCompanyApis';
import { useState } from 'react';

import CompanyLists from '@/components/companies/CompanyLists';
import Pagination from '@/components/common/pagination/Pagination';
import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import UnAuthorizedModal from '@/components/common/unauthorized/UnAuthorizedModal';
import styles from './page.module.scss';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/lib/stores/useAuthStore';

const PAGE_SIZE = 10;

export default function CompaniesPage() {
  const { t } = useTranslation('pages');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [region, setRegion] = useState<string>('ALL');
  const [industryType, setIndustryType] = useState<string>('ALL');
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, isError, error } = useGetAllCompanyInfo(
    searchValue,
    region,
    industryType,
    currentPage,
    PAGE_SIZE,
    isLoggedIn,
  );
  const isUnauthorized =
    !isLoggedIn || error?.message === 'Request failed with status code 401';

  const refetch = (
    newSearchValue: string,
    newRegion: string,
    newIndustryType: string,
  ) => {
    setSearchValue(newSearchValue);
    setRegion(newRegion);
    setIndustryType(newIndustryType);
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
        employmentType={industryType}
        value={searchValue}
        isForCompany={true}
      />
      {isLoading && <div>{t('companies.loading')}</div>}
      {isError && !isUnauthorized ? (
        <div>{error.message}</div>
      ) : data?.data.pageContents?.length ? (
        <>
          <CompanyLists data={data?.data} />
          <Pagination
            currentPage={data.data.pageNumber}
            totalPages={data.data.totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <div>{t('companies.empty')}</div>
      )}
    </div>
  );
}
