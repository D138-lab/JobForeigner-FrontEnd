import { useEffect, useState } from 'react';
import styles from './page.module.scss';
import StatusBox from '@/components/common/statusBox/StatusBox';
import { Application } from '@/lib/type/profile/application';
import ApplicationsTabs from '@/components/profile/applications/ApplicationsTabs';
import ApplicationInfo from '@/components/profile/applications/ApplicationInfo';
import useGetJobPostApplications from '@/lib/apis/queries/useGetJobPostApplications';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import {
  FileTextIcon,
  CalendarClock,
  CheckCircle2,
  Clock,
  Sparkles,
  XCircle,
} from 'lucide-react';
import Input from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';
import { useTranslation } from 'react-i18next';

function getIcon(status: string) {
  if (status === 'all') {
    return <FileTextIcon />;
  }
  if (status === 'reviewing') {
    return <Clock />;
  }
  if (status === 'interview') {
    return <CalendarClock />;
  }
  if (status === 'accepted') {
    return <CheckCircle2 />;
  }
  if (status === 'rejected') {
    return <XCircle />;
  }
  return null;
}

export default function ApplicationsPage() {
  const { t } = useTranslation('pages');
  const { data, isLoading, isError, error } = useGetJobPostApplications();
  const [searchApplication, setSearchApplication] = useState('');
  const applications: Application[] = (data?.data ?? []).map(application => ({
    id: application.jobPostId,
    company: application.companyName,
    title: application.title,
    logo: DEFAULT_IMAGE_URL,
    location: application.address,
    appliedAt: application.applicationDate,
    status:
      application.applicationStatus === 'APPLIED'
        ? 'reviewing'
        : application.applicationStatus === 'ACCEPTED'
          ? 'accepted'
          : 'rejected',
    resumeTitle: application.resumeName,
  }));
  const [selectedApplications, setSelectedApplications] = useState<{
    status: string;
    applications: Application[];
  }>({
    status: 'all',
    applications,
  });

  const reviewing = applications.filter(
    application => application.status === 'reviewing',
  );
  const interviewing = applications.filter(
    application => application.status === 'interview',
  );
  const accepted = applications.filter(
    application => application.status === 'accepted',
  );
  useEffect(() => {
    setSelectedApplications(prev => {
      if (prev.status === 'reviewing') {
        return { status: prev.status, applications: reviewing };
      }
      if (prev.status === 'interview') {
        return { status: prev.status, applications: interviewing };
      }
      if (prev.status === 'accepted') {
        return { status: prev.status, applications: accepted };
      }

      return { status: 'all', applications };
    });
  }, [accepted, applications, interviewing, reviewing]);
  const searchedApplications = selectedApplications.applications.filter(
    application =>
      application.title.toLowerCase().includes(searchApplication.toLowerCase()) ||
      application.company.toLowerCase().includes(searchApplication.toLowerCase()),
  );

  const statusBoxes = [
    {
      id: 1,
      title: t('profile.applications.statusSummary.all'),
      status: 'all',
      color: 'var(--color-sky-800)',
      number: applications.length,
    },
    {
      id: 2,
      title: t('profile.applications.statusSummary.reviewing'),
      status: 'reviewing',
      color: 'var(--color-blue-600)',
      number: reviewing.length,
    },
    {
      id: 3,
      title: t('profile.applications.statusSummary.interview'),
      status: 'interview',
      color: 'var(--color-green-600)',
      number: interviewing.length,
    },
    {
      id: 4,
      title: t('profile.applications.statusSummary.done'),
      status: 'accepted',
      color: 'var(--color-green-600)',
      number: accepted.length,
    },
  ];

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.pageHeader}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>
              <Sparkles size={14} />
              {t('profile.applications.title')}
            </span>
            <h1 className={styles.pageTitle}>{t('profile.applications.title')}</h1>
            <p className={styles.pageDescription}>
              {t('profile.applications.description')}
            </p>
          </div>
        </div>
        <div className={styles.statusBoxes}>
          {statusBoxes.map(statusBox => (
            <StatusBox
              icon={getIcon(statusBox.status)}
              iconColor={statusBox.color}
              key={statusBox.id}
              title={statusBox.title}
              number={statusBox.number}
            />
          ))}
        </div>
        <div className={styles.filterBox}>
          <div className={styles.filterRow}>
            <div className={styles.searchWrapper}>
              <Input
                icon='search'
                placeholder={t('profile.applications.searchPlaceholder')}
                value={searchApplication}
                onChange={e => setSearchApplication(e.target.value)}
              />
            </div>
            <div className={styles.selects}>
              <Select
                options={[
                  { value: 'all', label: t('profile.filters.all') },
                  {
                    value: 'completed',
                    label: t('profile.resume.completed'),
                  },
                  {
                    value: 'progressing',
                    label: t('profile.resume.inProgress'),
                  },
                ]}
                defaultValue='all'
                name='status'
              />
              <Select
                options={[
                  { value: 'newest', label: t('profile.filters.newest') },
                  { value: 'oldest', label: t('profile.filters.oldest') },
                ]}
                defaultValue='newest'
                name='sort'
              />
            </div>
          </div>
        </div>
        {isLoading ? <div>{t('jobs.loading')}</div> : null}
        {isError ? (
          <div>
            {(error as { message?: string }).message ??
              t('profile.applications.description')}
          </div>
        ) : null}

        {!isLoading && !isError ? <div className={styles.tabs}>
          <ApplicationsTabs
            applications={applications}
            reviewing={reviewing}
            interviewing={interviewing}
            accepted={accepted}
            selectedApplications={selectedApplications}
            setSelectedApplications={setSelectedApplications}
          />
        </div> : null}
        {!isLoading && !isError ? <div className={styles.applications}>
          {searchedApplications.length === 0 ? (
            <div>{t('jobs.empty')}</div>
          ) : (
            searchedApplications.map(application => (
              <ApplicationInfo
                key={application.id}
                application={application}
                icon={getIcon(application.status)}
              />
            ))
          )}
        </div> : null}
      </main>
    </div>
  );
}
