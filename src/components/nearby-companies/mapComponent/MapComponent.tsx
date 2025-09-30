import { useEffect, useState } from 'react';

import { Map } from 'react-kakao-maps-sdk';
import styles from './mapComponent.module.scss';

interface Props {
  level: number;
}

export const MapComponent = ({ level }: Props) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          setPosition({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        err => {
          console.error('위치 정보를 가져오지 못했습니다.', err);
          setPosition({ lat: 37.5665, lng: 126.978 });
        },
      );
    } else {
      alert('브라우저가 위치 정보를 지원하지 않습니다.');
      setPosition({ lat: 37.5665, lng: 126.978 });
    }
  }, []);

  return (
    <div className={styles.container}>
      <Map
        id='map'
        center={
          position || {
            lat: 37.5665,
            lng: 126.978,
          }
        }
        style={{
          width: '100%',
          height: '600px',
        }}
        level={level}
      />
    </div>
  );
};
