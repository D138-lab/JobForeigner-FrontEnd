import React from 'react';
import { Building2, Calendar, ArrowUpRight } from 'lucide-react';
import styles from './applicationHistory.module.scss';
import { ApplicationHistoryType } from '@/lib/type/profile/application';

interface ApplicationHistoryProps {
  applications: ApplicationHistoryType[];
}

export function ApplicationHistory({ applications }: ApplicationHistoryProps) {
  const recentApplications = [...applications].slice(0, 3);

  return (
    <div className={styles.container}>
      <ApplicationHistory.Header count={applications.length} />
      <ApplicationHistory.List>
        {recentApplications.map(application => (
          <ApplicationHistory.Item
            key={application.id}
            application={application}
          />
        ))}
      </ApplicationHistory.List>
    </div>
  );
}

type HeaderProps = {
  count: number;
};

ApplicationHistory.Header = function Header({ count }: HeaderProps) {
  return (
    <div className={styles.header}>
      <p className={styles.headerText}>총 {count}건의 지원 내역</p>
    </div>
  );
};

type ListProps = {
  children: React.ReactNode;
};

ApplicationHistory.List = function List({ children }: ListProps) {
  return <div className={styles.applicationList}>{children}</div>;
};

type ItemProps = {
  application: ApplicationHistoryType;
};

ApplicationHistory.Item = function Item({ application }: ItemProps) {
  return (
    <div className={styles.applicationItem}>
      <div className={styles.applicationInfo}>
        <div className={styles.iconWrapper}>
          <Building2 className={styles.icon} />
        </div>
        <div>
          <h3 className={styles.position}>{application.position}</h3>
          <p className={styles.company}>{application.company}</p>
          <div className={styles.appliedDate}>
            <Calendar className={styles.calendarIcon} />
            지원일: {application.appliedAt}
          </div>
        </div>
      </div>
      <div className={styles.statusActions}>
        <span
          className={`${styles.statusBadge} ${
            application.status === '서류 검토중'
              ? styles.statusReview
              : application.status === '면접 예정'
              ? styles.statusInterview
              : styles.statusRejected
          }`}
        >
          {application.status}
        </span>
        <button className={styles.detailButton}>
          <ArrowUpRight className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
};
