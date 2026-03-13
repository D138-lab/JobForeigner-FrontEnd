import 'swiper/css';
import 'swiper/css/effect-coverflow';

import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import styles from './longAdvertisementBanner.module.scss';

export interface Advertisement {
  adName: string;
  imgUrl: string;
}

type Props = {
  data: Advertisement[];
};

const LongAdvertisementBanner = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <Swiper
        modules={[EffectCoverflow, Autoplay]}
        effect='slide'
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className={styles.slider}
      >
        {data.map((d, idx) => (
          <SwiperSlide key={idx} className={styles.adBox}>
            <img src={d.imgUrl} alt={d.adName} />
            <div className={styles.overlay}>
              <span className={styles.badge}>Highlights</span>
              <div className={styles.content}>
                <h2>{d.adName}</h2>
                <p>지금 확인하면 놓치기 쉬운 혜택과 기회를 빠르게 찾을 수 있어요.</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LongAdvertisementBanner;
