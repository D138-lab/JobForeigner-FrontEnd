import { useState } from 'react';
import styles from './page.module.scss';
import StatusBox from '@/components/common/statusBox/StatusBox';
import { Application } from '@/lib/type/profile/application';
import ApplicationsTabs from '@/components/profile/applications/ApplicationsTabs';
import ApplicationInfo from '@/components/profile/applications/ApplicationInfo';
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

const applications: Application[] = [
  {
    id: 1,
    company: '토스',
    title: '프론트엔드 개발자',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '서울 강남구',
    appliedAt: '2021-08-01',
    status: 'reviewing',
    resumeTitle: '프론트엔드 개발자 이력서',
  },
  {
    id: 2,
    company: '당근마켓',
    title: '백엔드 개발자',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '서울 강남구',
    appliedAt: '2021-08-01',
    status: 'interview',
    resumeTitle: '백엔드 개발자 이력서',
  },
  {
    id: 3,
    company: '네이버',
    title: '디자이너',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '경기 성남',
    appliedAt: '2021-08-01',
    status: 'rejected',
    resumeTitle: '디자이너 이력서',
  },
  {
    id: 4,
    company: '카카오',
    title: '프론트엔드 개발자',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '서울 강남구',
    appliedAt: '2021-08-01',
    status: 'accepted',
    resumeTitle: '프론트엔드 개발자 이력서',
  },
  {
    id: 5,
    company: '라인',
    title: '프론트엔드 개발자',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '도쿄 신주쿠',
    appliedAt: '2021-08-01',
    status: 'interview',
    resumeTitle: '프론트엔드 개발자 이력서',
  },
  {
    id: 6,
    company: '우아한 형제들',
    title: '프론트엔드 개발자',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '경기 성남',
    appliedAt: '2021-08-01',
    status: 'reviewing',
    resumeTitle: '프론트엔드 개발자 이력서',
  },
  {
    id: 7,
    company: '쿠팡',
    title: '프론트엔드 개발자',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '서울 강남구',
    appliedAt: '2021-08-01',
    status: 'interview',
    resumeTitle: '프론트엔드 개발자 이력서',
  },
  {
    id: 8,
    company: '다쏘시스템',
    title: '프론트엔드 개발자',
    logo: 'https://toss.im/assets/images/toss-logo.png',
    location: '대구 중구',
    appliedAt: '2021-08-01',
    status: 'reviewing',
    resumeTitle: '프론트엔드 개발자 이력서',
  },
];

export default function ApplicationsPage() {
  const { t } = useTranslation('pages');
  const [searchApplication, setSearchApplication] = useState('');
  const [selectedApplications, setSelectedApplications] = useState<{
    status: string;
    applications: Application[];
  }>({
    status: 'all',
    applications: applications,
  });

  const reviewing = applications.filter(
    application => application.status === 'reviewing',
  );
  const interviewing = applications.filter(
    application => application.status === 'interview',
  );
  const accepted = applications.filter(
    application =>
      application.status === 'accepted' || application.status === 'rejected',
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

        <div className={styles.tabs}>
          <ApplicationsTabs
            applications={applications}
            reviewing={reviewing}
            interviewing={interviewing}
            accepted={accepted}
            selectedApplications={selectedApplications}
            setSelectedApplications={setSelectedApplications}
          />
        </div>
        <div className={styles.applications}>
          {selectedApplications.applications.map(application => (
            <ApplicationInfo
              key={application.id}
              application={application}
              icon={getIcon(application.status)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
