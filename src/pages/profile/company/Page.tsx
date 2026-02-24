import Button from '@/components/common/button/Button';
import styles from './page.module.scss';
import { Briefcase, Clock, PenSquare } from 'lucide-react';
import CompanyInfo from '@/components/profile/company/CompanyInfo';
import StatusBox from '@/components/common/statusBox/StatusBox';
import { Link } from 'react-router-dom';

const companyData = {
  name: '테크 솔루션즈',
  logo: '/placeholder.svg?height=200&width=200',
  ceo: '홍길동',
  businessNumber: '123-45-67890',
  address: '서울특별시 강남구 테헤란로 123',
  phone: '02-1234-5678',
  email: 'contact@techsolutions.com',
  website: 'https://techsolutions.com',
  industry: 'IT/소프트웨어',
  foundedYear: '2010',
  employeeCount: '50-100명',
  description:
    '테크 솔루션즈는 혁신적인 소프트웨어 솔루션을 제공하는 기업입니다. 우리는 최신 기술을 활용하여 고객의 비즈니스 성장을 돕고 있습니다.',
};

export default function CompanyProfilePage() {
  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.title}>
          <h1>기업 정보</h1>
          <Link to='/profile/company/edit'>
            <Button size='medium'>
              <span className={styles.buttonContent}>
                <PenSquare />
                정보 수정
              </span>
            </Button>
          </Link>
        </div>
        <section>
          <h2>기본 정보</h2>
          <p>기업의 기본 정보를 확인할 수 있습니다.</p>
          <CompanyInfo companyData={companyData} />
        </section>
        <div className={styles.statusWrapper}>
          <StatusBox
            icon={<Briefcase />}
            iconColor='var(--color-sky-800)'
            title='등록한 채용공고'
            number={12}
          />
          <StatusBox
            icon={<Clock />}
            iconColor='var(--color-green-600)'
            title='진행중인 채용'
            number={5}
          />
        </div>
      </main>
    </div>
  );
}
