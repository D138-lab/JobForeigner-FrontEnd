import React from 'react';
import { Building2, Calendar, ArrowUpRight } from 'lucide-react';
import styles from './applicationHistory.module.scss';
import { ApplicationHistoryType } from '@/lib/type/profile/application';
import { useTranslation } from 'react-i18next';

interface ApplicationHistoryProps {
  applications: ApplicationHistoryType[];
}

export function ApplicationHistory({ applications }: ApplicationHistoryProps) {
  const { t } = useTranslation('pages');
  const recentApplications = [...applications].slice(0, 3);

  return (
    <div className={styles.container}>
      <ApplicationHistory.Header count={applications.length} t={t} />
      <ApplicationHistory.List>
        {recentApplications.map(application => (
          <ApplicationHistory.Item
            key={application.id}
            application={application}
            t={t}
          />
        ))}
      </ApplicationHistory.List>
    </div>
  );
}

type HeaderProps = {
  count: number;
  t: (key: string, options?: Record<string, any>) => string;
};

ApplicationHistory.Header = function Header({ count, t }: HeaderProps) {
  return (
    <div className={styles.header}>
      <p className={styles.headerText}>
        {t('profile.component.applicationHistory.count', { count })}
      </p>
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
  t: (key: string, options?: Record<string, any>) => string;
};

ApplicationHistory.Item = function Item({ application, t }: ItemProps) {
  const parsedStatus =
    application.status === 'reviewing'
      ? t('profile.applications.statusSummary.reviewing')
      : application.status === 'interview'
      ? t('profile.applications.statusSummary.interview')
      : t('profile.companyApplications.status.rejected');

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
            {t('profile.component.common.appliedAt', {
              date: application.appliedAt,
            })}
          </div>
        </div>
      </div>
      <div className={styles.statusActions}>
        <span
          className={`${styles.statusBadge} ${
            application.status === 'reviewing'
              ? styles.statusReview
              : application.status === 'interview'
              ? styles.statusInterview
              : styles.statusRejected
          }`}
        >
          {parsedStatus}
        </span>
        <button className={styles.detailButton}>
          <ArrowUpRight className={styles.arrowIcon} />
        </button>
      </div>
    </div>
  );
};
