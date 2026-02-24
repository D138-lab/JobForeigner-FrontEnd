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
  XCircle,
} from 'lucide-react';
import Input from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';

function getIcon(title: string) {
  if (title === '전체 지원' || title === 'all') {
    return <FileTextIcon />;
  }
  if (title === '서류 검토중' || title === 'reviewing') {
    return <Clock />;
  }
  if (title === '면접 예정' || title === 'interview') {
    return <CalendarClock />;
  }
  if (title === '완료' || title === 'accepted') {
    return <CheckCircle2 />;
  }
  if (title === '완료' || title === 'rejected') {
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
      title: '전체 지원',
      color: 'var(--color-sky-800)',
      number: applications.length,
    },
    {
      id: 2,
      title: '서류 검토중',
      color: 'var(--color-blue-600)',
      number: reviewing.length,
    },
    {
      id: 3,
      title: '면접 예정',
      color: 'var(--color-green-600)',
      number: interviewing.length,
    },
    {
      id: 4,
      title: '완료',
      color: 'var(--color-green-600)',
      number: accepted.length,
    },
  ];

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <h1 className={styles.pageTitle}>지원 내역</h1>
        <p className={styles.pageDescription}>
          지원한 채용 공고와 진행 상태를 확인할 수 있습니다.
        </p>
        <div className={styles.statusBoxes}>
          {statusBoxes.map(statusBox => (
            <StatusBox
              icon={getIcon(statusBox.title)}
              iconColor={statusBox.color}
              key={statusBox.id}
              {...statusBox}
            />
          ))}
        </div>
        <div className={styles.filterBox}>
          <div className={styles.filterRow}>
            <div className={styles.searchWrapper}>
              <Input
                icon='search'
                placeholder='이력서 제목 검색'
                value={searchApplication}
                onChange={e => setSearchApplication(e.target.value)}
              />
            </div>
            <div className={styles.selects}>
              <Select
                options={[
                  { value: 'all', label: '전체' },
                  { value: 'completed', label: '작성완료' },
                  { value: 'progressing', label: '작성중' },
                ]}
                defaultValue='all'
                name='status'
              />
              <Select
                options={[
                  { value: 'newest', label: '최신순' },
                  { value: 'oldest', label: '오래된순' },
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
