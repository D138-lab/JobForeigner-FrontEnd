import { Link } from 'react-router-dom';
import styles from './page.module.scss';
import Button from '@/components/common/button/Button';
import { Ban, Building2, Clock, Plus, Users } from 'lucide-react';
import StatusBox from '@/components/common/statusBox/StatusBox';
import RecruitmentCard from '@/components/profile/company/recruitment/RecruitmentCard';
import Select from '@/components/common/select/Select';
import Input from '@/components/common/input/Input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('pages');
  const [searchRecruitment, setSearchRecruitment] = useState('');

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.title}>
          <div>
            <h1>{t('profile.companyRecruitment.title')}</h1>
            <p>{t('profile.companyRecruitment.description')}</p>
          </div>
          <Link to='/write-recruitment'>
            <Button size='medium'>
              <span className={styles.buttonContent}>
                <Plus />
                {t('profile.companyRecruitment.create')}
              </span>
            </Button>
          </Link>
        </div>
        <div className={styles.statusWrapper}>
          <StatusBox
            title={t('profile.companyRecruitment.status.all')}
            number={12}
            icon={<Building2 />}
            iconColor='var(--color-sky-800)'
          />
          <StatusBox
            title={t('profile.companyRecruitment.status.active')}
            number={5}
            icon={<Clock />}
            iconColor='var(--color-blue-600)'
          />
          <StatusBox
            title={t('profile.companyRecruitment.status.expired')}
            number={7}
            icon={<Ban />}
            iconColor='var(--color-red-600)'
          />
          <StatusBox
            title={t('profile.companyRecruitment.status.applicants')}
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
                placeholder={t('profile.companyRecruitment.searchPlaceholder')}
                value={searchRecruitment}
                onChange={e => setSearchRecruitment(e.target.value)}
              />
            </div>
            <div className={styles.selects}>
              <Select
                options={[
                  { value: 'all', label: t('profile.filters.all') },
                  {
                    value: 'active',
                    label: t('profile.companyRecruitment.status.active'),
                  },
                  {
                    value: 'expired',
                    label: t('profile.companyRecruitment.status.expired'),
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
        <div className={styles.recruitments}>
          {recruitments.length > 0 ? (
            recruitments.map(recruitment => (
              <RecruitmentCard key={recruitment.id} recruitment={recruitment} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <Building2 className={styles.buildingIcon} />
              <h3 className={styles.emptyTitle}>
                {t('profile.companyRecruitment.emptyTitle')}
              </h3>
              <p className={styles.emptyDescription}>
                {t('profile.companyRecruitment.emptyDescription')}
              </p>
              <Link to='/write-recruitment'>
                <Button>
                  <Plus className={styles.plusIcon} />
                  {t('profile.companyRecruitment.create')}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
