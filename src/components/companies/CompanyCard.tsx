import { Building2, MapPin, Users } from 'lucide-react';

import { CompanyType } from './CompanyLists';
import styles from './companyCard.module.scss';

const CompanyCard = ({
  companyImg,
  companyName,
  companyType,
  description,
  address,
  employeeCount,
}: CompanyType) => {
  return (
    <div className={styles.container}>
      <div className={styles.companyInfo}>
        <img src={companyImg} alt='이미지없음' />
        <div className={styles.description}>
          <div className={styles.companyName}>{companyName}</div>
          <div className={styles.description}>{description}</div>
        </div>
      </div>
      <div className={styles.detailInfo}>
        <div className={styles.companyType}>
          <Building2 width='1.4rem' />
          <span>{companyType}</span>
        </div>
        <div className={styles.adress}>
          <MapPin width='1.4rem' />
          <span>{address}</span>
        </div>
        <div className={styles.employeeNum}>
          <Users width='1.4rem' />
          <span>{employeeCount}</span>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
