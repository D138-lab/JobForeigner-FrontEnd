import LongAdvertisementBanner, {
  Advertisement,
} from '@/components/main/LongAdvertiseBanner';

import CompanyAdsBox from '@/components/main/CompanyAdsBox';
import { companyDummyAds } from '@/components/main/companyAdsDummy';
import styles from './page.module.scss';

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
