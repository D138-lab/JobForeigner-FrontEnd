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
      <section className={styles.adsSection}>
        <div className={styles.sectionHead}>
          <span className={styles.sectionEyebrow}>Featured Companies</span>
          <h2 className={styles.sectionTitle}>눈에 띄는 기업 광고</h2>
          <p className={styles.sectionDescription}>
            지금 주목할 만한 기업과 브랜드를 한눈에 둘러보세요.
          </p>
        </div>
        <CompanyAdsBox data={companyDummyAds} />
      </section>
    </main>
  );
}
