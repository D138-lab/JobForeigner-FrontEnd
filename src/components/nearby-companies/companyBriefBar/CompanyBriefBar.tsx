import { BriefCompanyInfo } from '../resultDetailBox/ResultDetailBox';
import { Star } from 'lucide-react';
import styles from './companyBriefBar.module.scss';

export const CompanyBriefBar = ({
  companyName,
  companyStatus,
  companyType,
  distance,
  rating,
}: BriefCompanyInfo) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.infos}>
          <div className={styles.companyName}>{companyName}</div>
          <div className={styles.companyType}>{companyType}</div>
        </div>
        <div className={styles.ratingInfo}>
          <div className={styles.rateInfo}>
            <Star size={15} fill='gold' color='gold' />
            <span>{rating}</span>
          </div>
          <div className={styles.distance}>{distance}km</div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div
          className={`${styles.status} ${
            companyStatus === '채용 중' ? styles.active : ''
          }`}
        >
          {companyStatus}
        </div>
        <div className={styles.moreInfo}>상세</div>
      </div>
    </div>
  );
};
