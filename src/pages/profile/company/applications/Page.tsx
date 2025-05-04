import StatusBox from '@/components/common/statusBox/StatusBox';
import styles from './page.module.scss';
import { Calendar, CheckCircle2, Clock, FileText } from 'lucide-react';
import ApplicationCard from '@/components/profile/company/applications/ApplicationCard';

const jobs = [
  {
    id: 1,
    title: '프론트엔드 개발자 (React/Next.js)',
  },
  {
    id: 2,
    title: '백엔드 개발자 (Node.js)',
  },
  {
    id: 3,
    title: 'UI/UX 디자이너',
  },
  {
    id: 4,
    title: 'DevOps 엔지니어',
  },
];

const applications = [
  {
    id: 1,
    jobId: 1,
    jobTitle: '프론트엔드 개발자 (React/Next.js)',
    jobInfo: {
      position: '프론트엔드 개발자',
      department: '개발팀',
      employmentType: '정규직',
      expiresAt: '2024-04-15',
    },
    applicant: {
      name: '김지원',
      photo: '/placeholder.svg?height=100&width=100',
      email: 'asd123@gmail.com',
      phone: '010-1234-5678',
    },
    resumeTitle: '프론트엔드 개발자 이력서',
    appliedAt: '2024-03-15',
    status: 'reviewing',
    interviewDate: null,
  },
  {
    id: 2,
    jobId: 1,
    jobTitle: '프론트엔드 개발자 (React/Next.js)',
    jobInfo: {
      position: '프론트엔드 개발자',
      department: '개발팀',
      employmentType: '정규직',
      expiresAt: '2024-04-15',
    },
    applicant: {
      name: '이민수',
      photo: '/placeholder.svg?height=100&width=100',
      email: 'lee@example.com',
      phone: '010-2345-6789',
    },
    resumeTitle: 'React 개발자 이력서',
    appliedAt: '2024-03-14',
    status: 'interview',
    interviewDate: '2024-03-25',
  },
  {
    id: 3,
    jobId: 2,
    jobTitle: '백엔드 개발자 (Node.js)',
    jobInfo: {
      position: '백엔드 개발자',
      department: '개발팀',
      employmentType: '정규직',
      expiresAt: '2024-04-10',
    },
    applicant: {
      name: '박서준',
      photo: '/placeholder.svg?height=100&width=100',
      email: 'park@example.com',
      phone: '010-3456-7890',
    },
    resumeTitle: '백엔드 개발자 이력서',
    appliedAt: '2024-03-12',
    status: 'rejected',
    interviewDate: '2024-03-25',
  },
  {
    id: 4,
    jobId: 3,
    jobTitle: 'UI/UX 디자이너',
    jobInfo: {
      position: 'UI/UX 디자이너',
      department: '디자인팀',
      employmentType: '계약직',
      expiresAt: '2024-04-05',
    },
    applicant: {
      name: '최유진',
      photo: '/placeholder.svg?height=100&width=100',
      email: 'choi@example.com',
      phone: '010-4567-8901',
    },
    resumeTitle: '디자이너 포트폴리오',
    appliedAt: '2024-03-10',
    status: 'accepted',
    interviewDate: '2024-03-25',
  },
  {
    id: 5,
    jobId: 1,
    jobTitle: '프론트엔드 개발자 (React/Next.js)',
    jobInfo: {
      position: '프론트엔드 개발자',
      department: '개발팀',
      employmentType: '정규직',
      expiresAt: '2024-04-15',
    },
    applicant: {
      name: '정다은',
      photo: '/placeholder.svg?height=100&width=100',
      email: 'jung@example.com',
      phone: '010-5678-9012',
    },
    resumeTitle: '프론트엔드 개발자 이력서',
    appliedAt: '2024-03-08',
    status: 'reviewing',
    interviewDate: null,
  },
];

export default function CompanyProfileApplicationsPage() {
  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.title}>
          <h1>지원서 관리</h1>
        </div>
        <div className={styles.statusWrapper}>
          <StatusBox
            title='전체 지원서'
            number={applications.length}
            icon={<FileText />}
            iconColor='var(--color-purple-600)'
          />
          <StatusBox
            title='검토중'
            number={
              applications.filter(
                application => application.status === 'reviewing',
              ).length
            }
            icon={<Clock />}
            iconColor='var(--color-blue-600)'
          />
          <StatusBox
            title='면접 예정'
            number={
              applications.filter(
                application => application.status === 'interview',
              ).length
            }
            icon={<Calendar />}
            iconColor='var(--color-green-600)'
          />
          <StatusBox
            title='완료'
            number={
              applications.filter(
                application =>
                  application.status === 'accepted' ||
                  application.status === 'rejected',
              ).length
            }
            icon={<CheckCircle2 />}
            iconColor='var(--color-green-600)'
          />
        </div>
        <div className={styles.applications}>
          {applications.length > 0 ? (
            applications.map(application => (
              <ApplicationCard key={application.id} application={application} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <FileText className={styles.fileTextIcon} />
              <h3 className={styles.emptyTitle}>등록된 지원서가 없습니다</h3>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
