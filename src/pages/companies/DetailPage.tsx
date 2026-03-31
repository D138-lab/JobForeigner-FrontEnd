import CompanyInfoPage from './subPage/CompanyInfoPage';
import RatingInfo from './subPage/RatingInfo';
import RecruitInfo from './subPage/RecruitInfo';
import ReviewInfo from './subPage/ReviewInfo';
import SalaryInfo from './subPage/SalaryInfo';
import useGetTranslatedCompany from '@/lib/apis/queries/useGetTranslatedCompany';
import { resolveTranslationLanguage } from '@/lib/utils/translation';
import styles from './detailPage.module.scss';
import { useGetCompanyDetailInfo } from '@/lib/apis/queries/useGetCompanyApis';
import { useLocation, useParams } from 'react-router-dom';
import { Globe, MapPin, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DetailPage = () => {
  const { t, i18n } = useTranslation('pages');
  const params = useParams();
  const location = useLocation();
  const fallbackCompanyId = location.state;
  const companyId = Number(params.id ?? fallbackCompanyId ?? 0);
  const { data, isLoading, isError, error } =
    useGetCompanyDetailInfo(companyId);
  const translationLanguage = resolveTranslationLanguage(i18n.language);
  const { data: translatedData } = useGetTranslatedCompany(
    companyId,
    translationLanguage,
    !!translationLanguage && Number.isFinite(companyId) && companyId > 0,
  );
  const optionTabs = [
    { key: 'info', label: t('companies.detail.tabs.info') },
    { key: 'recruit', label: t('companies.detail.tabs.recruit') },
    { key: 'salary', label: t('companies.detail.tabs.salary') },
    { key: 'rating', label: t('companies.detail.tabs.rating') },
    { key: 'review', label: t('companies.detail.tabs.review') },
  ];
  const [selectedTab, setSelectedTab] = useState(optionTabs[0].key);

  if (isLoading) {
    return <div>{t('companies.detail.loading')}</div>;
  }
  if (isError) {
    console.error('에러 발생:', error);
    return <div>{t('companies.detail.loadError')}</div>;
  }
  if (!data || !Number.isFinite(companyId) || companyId <= 0) {
    return <div>{t('companies.detail.notFound')}</div>;
  }

  const companyData = translatedData?.data ?? data.data;
  const companyInfo = companyData.companyInfoDto;
  const jobPost = companyData.jobPostDto;
  const salaryInfo = companyData.salaryInfoDto;
  const companyRating = companyData.companyRatingDto;
  const review = companyData.reviewDto;
  const formattedEmployeeCount = useMemo(
    () => new Intl.NumberFormat(i18n.language).format(companyInfo.employeeCount),
    [companyInfo.employeeCount, i18n.language],
  );
  const companyDomain = useMemo(() => {
    if (!companyInfo.url) return null;

    try {
      return new URL(companyInfo.url).hostname.replace(/^www\./, '');
    } catch {
      return companyInfo.url;
    }
  }, [companyInfo.url]);

  return (
    <div className={styles.container}>
      <div className={styles.infoTitle}>
        <div className={styles.logoWrap}>
          <img src={companyData.imageUrl} alt={companyInfo.companyName} />
        </div>
        <div className={styles.titleContent}>
          <div className={styles.companyBadgeRow}>
            <span className={styles.companyBadge}>{companyInfo.category}</span>
          </div>
          <div className={styles.companyName}>{companyInfo.companyName}</div>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <MapPin size={16} />
              {companyInfo.address}
            </span>
            <span className={styles.metaItem}>
              <Users size={16} />
              {t('companies.info.employee')} {formattedEmployeeCount}
            </span>
            {companyDomain ? (
              <span className={styles.metaItem}>
                <Globe size={16} />
                {companyDomain}
              </span>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.optionTab}>
        {optionTabs.map(ele => (
          <button
            type='button'
            onClick={() => setSelectedTab(ele.key)}
            key={ele.key}
            className={`${styles.option} ${
              selectedTab === ele.key ? styles.selectedOption : ''
            }`}
          >
            {ele.label}
          </button>
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
