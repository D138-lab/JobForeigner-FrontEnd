import CompanyInfoPage from './subPage/CompanyInfoPage';
import RatingInfo from './subPage/RatingInfo';
import RecruitInfo from './subPage/RecruitInfo';
import ReviewInfo from './subPage/ReviewInfo';
import SalaryInfo from './subPage/SalaryInfo';
import styles from './detailPage.module.scss';
import { useGetCompanyDetailInfo } from '@/lib/apis/mutations/useCompanyApis';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const DetailPage = () => {
  const location = useLocation();
  const companyId = location.state;
  const { data, isLoading, isError, error } =
    useGetCompanyDetailInfo(companyId);
  const optionTabs = ['기업정보', '채용', '연봉', '기업평점', '후기'];
  const [selectedTab, setSelectedTab] = useState(optionTabs[0]);

  if (!data) {
    return <div>해당 기업 정보를 찾을 수 없습니다.</div>;
  }
  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  const companyInfo = data.data.companyInfoDto;
  const jobPost = data.data.jobPostDto;
  const salaryInfo = data.data.salaryInfoDto;
  const companyRating = data.data.companyRatingDto;
  const review = data.data.reviewDto;

  return (
    <div className={styles.container}>
      <div className={styles.infoTitle}>
        <img src={companyInfo.url} alt={companyInfo.companyName} />
        <div className={styles.companyName}>{companyInfo.companyName}</div>
      </div>
      <div className={styles.optionTab}>
        {optionTabs.map(ele => (
          <div
            onClick={() => setSelectedTab(ele)}
            key={ele}
            className={`${styles.option} ${
              selectedTab === ele ? styles.selectedOption : ''
            }`}
          >
            {ele}
          </div>
        ))}
      </div>
      <div className={styles.selectInfo}>
        {selectedTab === '기업정보' && (
          <CompanyInfoPage
            companyAddress={companyInfo.address}
            companyName={companyInfo.companyName}
            companyType={companyInfo.category}
            description={companyInfo.description}
            homepageUrl={companyInfo.url}
            numOfEmployee={companyInfo.employeeCount}
            benefits={'복지'}
          />
        )}
        {selectedTab === '채용' && <RecruitInfo />}
        {selectedTab === '연봉' && (
          <SalaryInfo
            averageSalary={+salaryInfo.averageSalary}
            monthlySalary={+salaryInfo.monthlySalary}
          />
        )}
        {selectedTab === '기업평점' && <RatingInfo />}
        {selectedTab === '후기' && <ReviewInfo />}
      </div>
    </div>
  );
};

export default DetailPage;
