import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, Sparkles } from 'lucide-react';
import styles from './page.module.scss';
import BookmarkTabs from '@/components/profile/bookmark/BookmarkTab';
import Input from '@/components/common/input/Input';
import { Job } from '@/lib/type/profile/bookmark';
import ScrapedRecruitmentCard from '@/components/profile/bookmark/scraps/ScrapedRecruitmentCard';
import Select from '@/components/common/select/Select';
import { useTranslation } from 'react-i18next';

const bookmarkedJobs: Job[] = [
  {
    id: 1,
    title: '프론트엔드 개발자 (React/Next.js)',
    company: { id: 1, name: '테크 솔루션즈', logo: '/placeholder.svg' },
    location: '서울 강남구',
    employmentType: '정규직',
    salary: '6,000만원 이상',
    expiresAt: '2024-04-15',
    bookmarkedAt: '2024-03-15',
    status: 'active',
  },
  {
    id: 2,
    title: '백엔드 개발자 (Node.js)',
    company: { id: 2, name: '글로벌 소프트', logo: '/placeholder.svg' },
    location: '서울 서초구',
    employmentType: '정규직',
    salary: '5,500만원 이상',
    expiresAt: '2024-04-10',
    bookmarkedAt: '2024-03-10',
    status: 'active',
  },
  {
    id: 3,
    title: 'UI/UX 디자이너',
    company: { id: 3, name: '스타트업 허브', logo: '/placeholder.svg' },
    location: '서울 마포구',
    employmentType: '계약직',
    salary: '4,500만원 이상',
    expiresAt: '2024-04-05',
    bookmarkedAt: '2024-03-05',
    status: 'active',
  },
  {
    id: 4,
    title: 'DevOps 엔지니어',
    company: { id: 4, name: '디지털 크리에이티브', logo: '/placeholder.svg' },
    location: '경기 성남시',
    employmentType: '정규직',
    salary: '6,500만원 이상',
    expiresAt: '2024-03-28',
    bookmarkedAt: '2024-02-28',
    status: 'expired',
  },
  {
    id: 5,
    title: '데이터 분석가',
    company: { id: 5, name: '테크 이노베이션', logo: '/placeholder.svg' },
    location: '서울 영등포구',
    employmentType: '정규직',
    salary: '5,000만원 이상',
    expiresAt: '2024-03-20',
    bookmarkedAt: '2024-02-20',
    status: 'expired',
  },
];

export default function BookmarkedJobsPage() {
  const { t } = useTranslation('pages');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter] = useState<'all' | 'active' | 'expired'>('all');
  const [sortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredJobs = bookmarkedJobs
    .filter(
      job =>
        (job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || job.status === statusFilter),
    )
    .sort((a, b) => {
      const dateA = new Date(a.bookmarkedAt).getTime();
      const dateB = new Date(b.bookmarkedAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const removeBookmark = (jobId: number) => {
    console.log(`Remove bookmark for job ${jobId}`);
    // TODO: API 호출로 스크랩 삭제
  };

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.pageHeader}>
          <div className={styles.headerText}>
            <span className={styles.eyebrow}>
              <Sparkles size={14} />
              {t('profile.bookmark.title')}
            </span>
          <h1 className={styles.pageTitle}>{t('profile.bookmark.title')}</h1>
          <p className={styles.pageDescription}>
            {t('profile.bookmark.description')}
          </p>
          </div>
        </div>
        <BookmarkTabs />
        {/* 검색 및 필터 */}
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <Input
              type='text'
              placeholder={t('profile.bookmark.jobs.searchPlaceholder')}
              icon='search'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.selectGroup}>
            <Select
              options={[
                { value: 'all', label: t('profile.filters.all') },
                {
                  value: 'active',
                  label: t('profile.bookmark.jobs.status.active'),
                },
                {
                  value: 'expired',
                  label: t('profile.bookmark.jobs.status.expired'),
                },
              ]}
              defaultValue='all'
            />
            <Select
              options={[
                { value: 'newest', label: t('profile.filters.newest') },
                { value: 'oldest', label: t('profile.filters.oldest') },
              ]}
              defaultValue='newest'
            />
          </div>
        </div>

        {/* 스크랩한 채용 공고 목록 */}
        <div className={styles.list}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map(job => (
              <ScrapedRecruitmentCard
                key={job.id}
                job={job}
                onRemoveBookmark={removeBookmark}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <Bookmark className={styles.emptyIcon} />
              <h3>{t('profile.bookmark.jobs.emptyTitle')}</h3>
              <p>{t('profile.bookmark.jobs.emptyDescription')}</p>
              <Link to='/jobs'>
                <button className={styles.browseButton}>
                  {t('profile.bookmark.jobs.browse')}
                </button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
