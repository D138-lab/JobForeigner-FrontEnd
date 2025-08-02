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
        effect='coverflow'
        grabCursor={true}
        centeredSlides={true}
        slidesPerView='auto'
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1.5,
          slideShadows: true,
        }}
        className={styles.slider}
      >
        {data.map((d, idx) => (
          <SwiperSlide key={idx} className={styles.adBox}>
            <img src={d.imgUrl} alt={d.adName} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LongAdvertisementBanner;
