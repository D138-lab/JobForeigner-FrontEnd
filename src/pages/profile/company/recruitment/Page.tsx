import { Link } from 'react-router-dom';
import styles from './page.module.scss';
import Button from '@/components/common/button/Button';
import { Ban, Building2, Clock, Plus, Users } from 'lucide-react';
import StatusBox from '@/components/common/statusBox/StatusBox';
import RecruitmentCard from '@/components/profile/company/recruitment/RecruitmentCard';
import Select from '@/components/common/select/Select';
import Input from '@/components/common/input/Input';
import { useState } from 'react';

const recruitments = [
  {
    id: 0,
    title: '프론트엔드 개발자 (React/Next.js)',
    location: '서울 강남구',
    employmentType: '정규직',
    createdAt: '2021-08-01',
    expiresAt: '2021-08-31',
    status: 'active',
    applicantsCount: 0,
    viewCount: 0,
  },
  {
    id: 1,
    title: '백엔드 개발자 (Node.js)',
    location: '서울 강남구',
    employmentType: '정규직',
    createdAt: '2021-08-01',
    expiresAt: '2021-08-31',
    status: 'expired',
    applicantsCount: 0,
    viewCount: 0,
  },
  {
    id: 2,
    title: '풀스택 개발자 (MERN)',
    location: '서울 강남구',
    employmentType: '정규직',
    createdAt: '2021-08-01',
    expiresAt: '2021-08-31',
    status: 'expired',
    applicantsCount: 0,
    viewCount: 0,
  },
];

export default function CompanyProfileRecruitmentPage() {
  const [searchRecruitment, setSearchRecruitment] = useState('');

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.title}>
          <div>
            <h1>채용 공고 관리</h1>
            <p>등록한 채용 공고를 관리하고 새 공고를 작성할 수 있습니다.</p>
          </div>
          <Link to='/write-recruitment'>
            <Button size='medium'>
              <span className={styles.buttonContent}>
                <Plus />새 공고 작성
              </span>
            </Button>
          </Link>
        </div>
        <div className={styles.statusWrapper}>
          <StatusBox
            title='전체공고'
            number={12}
            icon={<Building2 />}
            iconColor='var(--color-sky-800)'
          />
          <StatusBox
            title='진행중'
            number={5}
            icon={<Clock />}
            iconColor='var(--color-blue-600)'
          />
          <StatusBox
            title='마감'
            number={7}
            icon={<Ban />}
            iconColor='var(--color-red-600)'
          />
          <StatusBox
            title='지원자'
            number={0}
            icon={<Users />}
            iconColor='var(--color-green-600)'
          />
        </div>
        <div className={styles.filterBox}>
          <div className={styles.filterRow}>
            <div className={styles.searchWrapper}>
              <Input
                icon='search'
                placeholder='지원서 제목 검색'
                value={searchRecruitment}
                onChange={e => setSearchRecruitment(e.target.value)}
              />
            </div>
            <div className={styles.selects}>
              <Select
                options={[
                  { value: 'all', label: '전체' },
                  { value: 'active', label: '진행중' },
                  { value: 'expired', label: '마감' },
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
        <div className={styles.recruitments}>
          {recruitments.length > 0 ? (
            recruitments.map(recruitment => (
              <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <Building2 className={styles.buildingIcon} />
              <h3 className={styles.emptyTitle}>등록된 채용 공고가 없습니다</h3>
              <p className={styles.emptyDescription}>
                새 채용 공고를 작성해보세요.
              </p>
              <Link to='/write-recruitment'>
                <Button>
                  <Plus className={styles.plusIcon} />새 공고 작성
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
