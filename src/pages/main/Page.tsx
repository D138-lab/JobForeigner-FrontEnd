import LongAdvertisementBanner, {
  Advertisement,
} from '@/components/main/LongAdvertiseBanner';

import CompanyAdsBox from '@/components/main/CompanyAdsBox';
import { companyDummyAds } from '@/components/main/companyAdsDummy';
import styles from './page.module.scss';

const featuredJobs = [
  {
    id: 1,
    title: '프론트엔드 개발자 (React/Next.js)',
    company: '테크 솔루션즈',
    companyLogo: '/placeholder.svg?height=100&width=100',
    location: '서울 강남구',
    isNew: true,
    timeAgo: '',
    tags: ['React', 'Next.js', '경력 3년+'],
  },
  {
    id: 2,
    title: '영어 교육 강사',
    company: '글로벌 어학원',
    companyLogo: '/placeholder.svg?height=100&width=100',
    location: '부산 해운대구',
    isNew: false,
    timeAgo: '3일 전',
    tags: ['영어 원어민', '교육 경험자'],
  },
  {
    id: 3,
    title: '호텔 프론트 데스크',
    company: '그랜드 호텔',
    companyLogo: '/placeholder.svg?height=100&width=100',
    location: '제주시',
    isNew: true,
    timeAgo: '',
    tags: ['영어 가능자', '숙박업 경험'],
  },
  {
    id: 4,
    title: '생산직 사원',
    company: '삼성전자',
    companyLogo: '/placeholder.svg?height=100&width=100',
    location: '경기도 수원시',
    isNew: false,
    timeAgo: '1주일 전',
    tags: ['제조업', '교대근무'],
  },
  {
    id: 5,
    title: '번역 및 통역 전문가',
    company: '국제 비즈니스 센터',
    companyLogo: '/placeholder.svg?height=100&width=100',
    location: '서울 중구',
    isNew: false,
    timeAgo: '2일 전',
    tags: ['다국어 가능자', '통번역'],
  },
  {
    id: 6,
    title: '요리사 (한식)',
    company: '전통 한식당',
    companyLogo: '/placeholder.svg?height=100&width=100',
    location: '인천 송도',
    isNew: false,
    timeAgo: '5일 전',
    tags: ['조리사 자격증', '경력자 우대'],
  },
];

const dummyAds: Advertisement[] = [
  {
    adName: '글로벌 취업 박람회',
    imgUrl: '/dummy_ad1.png',
  },
  {
    adName: '한국어 무료 강의',
    imgUrl: '/dummy_ad2.png',
  },
  {
    adName: '외국인 전용 건강 검진',
    imgUrl: '/dummy_ad3.png',
  },
  {
    adName: '문화 체험 행사 모집',
    imgUrl: '/dummy_ad4.png',
  },
];

export default function MainPage() {
  return (
    <main className={styles.page}>
      <LongAdvertisementBanner data={dummyAds} />
      <CompanyAdsBox data={companyDummyAds} />
    </main>
  );
}
