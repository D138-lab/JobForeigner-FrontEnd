import CompanyInfoPage from './subPage/CompanyInfoPage';
import RatingInfo from './subPage/RatingInfo';
import RecruitInfo from './subPage/RecruitInfo';
import ReviewInfo from './subPage/ReviewInfo';
import SalaryInfo from './subPage/SalaryInfo';
import useGetTranslatedCompany from '@/lib/apis/queries/useGetTranslatedCompany';
import { resolveTranslationLanguage } from '@/lib/utils/translation';
import styles from './detailPage.module.scss';
import { useGetCompanyDetailInfo } from '@/lib/apis/queries/useGetCompanyApis';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const DetailPage = () => {
  const { t, i18n } = useTranslation('pages');
  const location = useLocation();
  const companyId = location.state;
  const { data, isLoading, isError, error } =
    useGetCompanyDetailInfo(companyId);
  const translationLanguage = resolveTranslationLanguage(i18n.language);
  const { data: translatedData } = useGetTranslatedCompany(
    companyId,
    translationLanguage,
    !!translationLanguage,
  );
  const optionTabs = [
    { key: 'info', label: t('companies.detail.tabs.info') },
    { key: 'recruit', label: t('companies.detail.tabs.recruit') },
    { key: 'salary', label: t('companies.detail.tabs.salary') },
    { key: 'rating', label: t('companies.detail.tabs.rating') },
    { key: 'review', label: t('companies.detail.tabs.review') },
  ];
  const [selectedTab, setSelectedTab] = useState(optionTabs[0].key);

  if (!data) {
    return <div>{t('companies.detail.notFound')}</div>;
  }
  if (isLoading) {
    return <div>{t('companies.detail.loading')}</div>;
  }
  if (isError) {
    console.error('에러 발생:', error);
    return <div>{t('companies.detail.loadError')}</div>;
  }

  console.log('기업 상세 정보:', data);

  const companyData = translatedData?.data ?? data.data;
  const companyInfo = companyData.companyInfoDto;
  const jobPost = companyData.jobPostDto;
  const salaryInfo = companyData.salaryInfoDto;
  const companyRating = companyData.companyRatingDto;
  const review = companyData.reviewDto;

  return (
    <div className={styles.container}>
      <div className={styles.infoTitle}>
        <img src={companyData.imageUrl} alt={companyInfo.companyName} />
        <div className={styles.companyName}>{companyInfo.companyName}</div>
      </div>
      <div className={styles.optionTab}>
        {optionTabs.map(ele => (
          <div
            onClick={() => setSelectedTab(ele.key)}
            key={ele.key}
            className={`${styles.option} ${
              selectedTab === ele.key ? styles.selectedOption : ''
            }`}
          >
            {ele.label}
          </div>
        ))}
      </div>
      <div className={styles.selectInfo}>
        {selectedTab === 'info' && (
          <CompanyInfoPage
            companyAddress={companyInfo.address}
            companyName={companyInfo.companyName}
            companyType={companyInfo.category}
            description={companyInfo.description}
            homepageUrl={companyInfo.url}
            numOfEmployee={companyInfo.employeeCount}
            benefits={companyInfo.welfare}
          />
        )}
        {selectedTab === 'recruit' && (
          <RecruitInfo data={jobPost} />
        )}
        {selectedTab === 'salary' && (
          <SalaryInfo
            averageSalary={+salaryInfo.averageSalary}
            monthlySalary={+salaryInfo.monthlySalary}
          />
        )}
        {selectedTab === 'rating' && (
          <RatingInfo {...companyRating} />
        )}
        {selectedTab === 'review' && (
          <ReviewInfo data={review} />
        )}
      </div>
    </div>
  );
};

export default DetailPage;
