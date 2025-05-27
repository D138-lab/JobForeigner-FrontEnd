import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import styles from './page.module.scss';
import { Company } from '@/lib/type/profile/bookmark';
import LikedCompanyCard from '@/components/profile/bookmark/liked-companies/LikedCompanyCard';
import BookmarkTabs from '@/components/profile/bookmark/BookmarkTab';
import Input from '@/components/common/input/Input';
import Select from '@/components/common/select/Select';

const bookmarkedCompanies: Company[] = [
  {
    id: 1,
    name: '테크 솔루션즈',
    logo: '/placeholder.svg',
    industry: 'IT/소프트웨어',
    location: '서울 강남구',
    employeeCount: '50-100명',
    bookmarkedAt: '2024-03-15',
    activeJobsCount: 3,
    isNotificationOn: true,
  },
  {
    id: 2,
    name: '글로벌 소프트',
    logo: '/placeholder.svg',
    industry: 'IT/소프트웨어',
    location: '서울 서초구',
    employeeCount: '100-300명',
    bookmarkedAt: '2024-03-10',
    activeJobsCount: 5,
    isNotificationOn: false,
  },
  {
    id: 3,
    name: '스타트업 허브',
    logo: '/placeholder.svg',
    industry: 'IT/소프트웨어',
    location: '서울 마포구',
    employeeCount: '10-50명',
    bookmarkedAt: '2024-03-05',
    activeJobsCount: 2,
    isNotificationOn: true,
  },
  {
    id: 4,
    name: '디지털 크리에이티브',
    logo: '/placeholder.svg',
    industry: '디자인',
    location: '경기 성남시',
    employeeCount: '10-50명',
    bookmarkedAt: '2024-03-01',
    activeJobsCount: 1,
    isNotificationOn: false,
  },
  {
    id: 5,
    name: '테크 이노베이션',
    logo: '/placeholder.svg',
    industry: 'IT/소프트웨어',
    location: '서울 영등포구',
    employeeCount: '300-500명',
    bookmarkedAt: '2024-02-25',
    activeJobsCount: 8,
    isNotificationOn: true,
  },
];

export default function BookmarkedCompaniesPage() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredCompanies = bookmarkedCompanies
    .filter(
      company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const dateA = new Date(a.bookmarkedAt).getTime();
      const dateB = new Date(b.bookmarkedAt).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const toggleNotification = (companyId: number) => {
    console.log(`Toggle notification for company ${companyId}`);
    // TODO: API call to update notification state
  };

  const removeBookmark = (companyId: number) => {
    console.log(`Remove bookmark for company ${companyId}`);
    // TODO: API call to remove bookmark
  };

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div>
          <h1 className={styles.pageTitle}>북마크</h1>
          <p className={styles.pageDescription}>
            관심 기업과 스크랩한 채용 공고를 관리할 수 있습니다.
          </p>
        </div>
        <BookmarkTabs />
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <Input
              icon='search'
              placeholder='기업명 또는 업종 검색'
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <Select
            options={[
              { value: 'newest', label: '최신순' },
              { value: 'oldest', label: '오래된순' },
            ]}
            defaultValue='newest'
          />
        </div>

        <div className={styles.list}>
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map(company => (
              <LikedCompanyCard
                key={company.id}
                company={company}
                onToggleNotification={toggleNotification}
                onRemoveBookmark={removeBookmark}
              />
            ))
          ) : (
            <div className={styles.emptyState}>
              <Star className={styles.emptyIcon} />
              <h3>관심 기업이 없습니다</h3>
              <p>
                기업 페이지에서 별표 아이콘을 클릭하여 관심 기업으로
                등록해보세요.
              </p>
              <Link to='/companies'>
                <button className={styles.browseButton}>기업 둘러보기</button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
