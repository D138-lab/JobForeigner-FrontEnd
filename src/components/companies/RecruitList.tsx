import { Briefcase, Calendar } from 'lucide-react';

import { JobPostDto } from '@/lib/apis/mutations/useCompanyApis';
import styles from './recruitList.module.scss';

export const RecruitList = ({
  employmentType,
  location,
  title,
  career,
  expiryAt,
}: JobPostDto) => {
  const deadline = new Date(expiryAt);
  return (
    <div className={styles.container}>
      <div className={styles.topInfo}>
        <div className={styles.empolyeeType}>{employmentType}</div>
        <div className={styles.region}>{location}</div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.bottomInfo}>
        <div className={styles.teamName}>
          <Briefcase width='1.4rem' />
          <span>{career}</span>
        </div>
        <div className={styles.deadline}>
          <Calendar width='1.4rem' />
          <span>{`${deadline.getFullYear()}.${deadline.getMonth()}.${deadline.getDate()}`}</span>
        </div>
      </div>
    </div>
  );
};
