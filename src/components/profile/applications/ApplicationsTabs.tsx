import { Application } from '@/lib/type/profile/application';
import clsx from 'clsx';
import styles from './applicationsTabs.module.scss';
import { useTranslation } from 'react-i18next';

interface ApplicationsTabsProps {
  applications: Application[];
  reviewing: Application[];
  interviewing: Application[];
  accepted: Application[];
  selectedApplications: { status: string; applications: Application[] };
  setSelectedApplications: (applications: {
    status: string;
    applications: Application[];
  }) => void;
}

export default function ApplicationsTabs({
  applications,
  reviewing,
  interviewing,
  accepted,
  selectedApplications,
  setSelectedApplications,
}: ApplicationsTabsProps) {
  const { t } = useTranslation('pages');
  return (
    <>
      <button
        className={clsx(
          styles.tab,
          selectedApplications.status === 'all' && styles.active,
        )}
        onClick={() =>
          setSelectedApplications({
            status: 'all',
            applications: applications,
          })
        }
      >
        {t('profile.applications.statusSummary.all')} ({applications.length})
      </button>
      <button
        className={clsx(
          styles.tab,
          selectedApplications.status === 'reviewing' && styles.active,
        )}
        onClick={() =>
          setSelectedApplications({
            status: 'reviewing',
            applications: reviewing,
          })
        }
      >
        {t('profile.applications.statusSummary.reviewing')} ({reviewing.length})
      </button>
      <button
        className={clsx(
          styles.tab,
          selectedApplications.status === 'interview' && styles.active,
        )}
        onClick={() =>
          setSelectedApplications({
            status: 'interview',
            applications: interviewing,
          })
        }
      >
        {t('profile.applications.statusSummary.interview')} (
        {interviewing.length})
      </button>
      <button
        className={clsx(
          styles.tab,
          selectedApplications.status === 'accepted' && styles.active,
        )}
        onClick={() =>
          setSelectedApplications({
            status: 'accepted',
            applications: accepted,
          })
        }
      >
        {t('profile.applications.statusSummary.done')} ({accepted.length})
      </button>
    </>
  );
}
