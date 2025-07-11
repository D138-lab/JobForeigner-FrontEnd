import { Briefcase, Calendar } from 'lucide-react';

import styles from './recruitList.module.scss';

export type RecruitListProps = {
  jobPostId: number;
  title: string;
  location: string;
  employmentType: string;
  career: string;
  deadline: Date;
};

export const RecruitList = ({
  employmentType,
  location,
  title,
  career,
  deadline,
}: RecruitListProps) => {
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
          <span>{deadline.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};
