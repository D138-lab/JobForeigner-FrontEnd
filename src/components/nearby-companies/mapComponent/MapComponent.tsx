import { useEffect, useState } from 'react';

import { LocateFixed, Minus, Plus } from 'lucide-react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import styles from './mapComponent.module.scss';

interface Props {
  level: number;
}

export const MapComponent = ({ level }: Props) => {
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [currentLevel, setCurrentLevel] = useState(level);

  const fallbackPosition = { lat: 37.5665, lng: 126.978 };

  const moveToCurrentPosition = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        const nextPosition = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setPosition(nextPosition);
        if (map) {
          map.panTo(new kakao.maps.LatLng(nextPosition.lat, nextPosition.lng));
        }
      },
      err => {
        console.error('위치 정보를 가져오지 못했습니다.', err);
      },
    );
  };

  const handleZoomIn = () => {
    if (!map) return;
    const nextLevel = Math.max(1, map.getLevel() - 1);
    map.setLevel(nextLevel);
    setCurrentLevel(nextLevel);
  };

  const handleZoomOut = () => {
    if (!map) return;
    const nextLevel = Math.min(14, map.getLevel() + 1);
    map.setLevel(nextLevel);
    setCurrentLevel(nextLevel);
  };

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
          setPosition(fallbackPosition);
        },
      );
    } else {
      setPosition(fallbackPosition);
    }
  }, []);

  useEffect(() => {
    setCurrentLevel(level);
  }, [level]);

  return (
    <div className={styles.container}>
      <div className={styles.mapControls}>
        <button
          type='button'
          className={styles.controlButton}
          onClick={moveToCurrentPosition}
          aria-label='현재 위치로 이동'
          title='현재 위치로 이동'
        >
          <LocateFixed size={18} />
        </button>
        <button
          type='button'
          className={styles.controlButton}
          onClick={handleZoomIn}
          aria-label='지도 확대'
          title='지도 확대'
        >
          <Plus size={18} />
        </button>
        <button
          type='button'
          className={styles.controlButton}
          onClick={handleZoomOut}
          aria-label='지도 축소'
          title='지도 축소'
        >
          <Minus size={18} />
        </button>
      </div>
      <Map
        id='map'
        center={position || fallbackPosition}
        style={{
          width: '100%',
          height: '600px',
        }}
        level={currentLevel}
        onCreate={setMap}
      >
        <MapMarker position={position || fallbackPosition} />
      </Map>
    </div>
  );
};
