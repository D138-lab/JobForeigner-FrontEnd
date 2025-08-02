import { useEffect, useRef, useState } from 'react';

import styles from './longAdvertisementBanner.module.scss';

export interface Advertisement {
  adName: string;
  imgUrl: string;
}

type Props = {
  data: Advertisement[];
};

const LongAdvertisementBanner = ({ data }: Props) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const groupSize = 1;
  const totalGroups = Math.ceil(data.length / groupSize);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % totalGroups);
    }, 3000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, totalGroups]);

  const getVisibleAds = () => {
    const start = currentIndex * groupSize;
    return data.slice(start, start + groupSize);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slider}>
        {getVisibleAds().map((d, idx) => (
          <div key={idx} className={styles.adBox}>
            <img src={d.imgUrl} alt={d.adName} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LongAdvertisementBanner;
