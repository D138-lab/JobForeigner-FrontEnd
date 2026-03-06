import Select, { Option } from '@/components/common/select/Select';
import { selectRegionOptions } from '@/components/jobs/DetailSearchForm';
import { MapComponent } from '@/components/nearby-companies/mapComponent/MapComponent';
import useGetMapSido from '@/lib/apis/queries/useGetMapSido';
import styles from './page.module.scss';
import { useEffect, useMemo, useState } from 'react';

const mockPostCountByRegion: Record<string, number> = {
  서울: 128,
  부산: 76,
  대구: 45,
  인천: 52,
  광주: 29,
  대전: 31,
  울산: 22,
  세종: 9,
  경기: 164,
  강원: 18,
  충북: 21,
  충남: 24,
  전북: 19,
  전남: 17,
  경북: 26,
  경남: 33,
  제주: 12,
};

const regionCenters: Record<string, { lat: number; lng: number }> = {
  서울: { lat: 37.5665, lng: 126.978 },
  서울특별시: { lat: 37.5665, lng: 126.978 },
  부산: { lat: 35.1796, lng: 129.0756 },
  부산광역시: { lat: 35.1796, lng: 129.0756 },
  대구: { lat: 35.8714, lng: 128.6014 },
  대구광역시: { lat: 35.8714, lng: 128.6014 },
  인천: { lat: 37.4563, lng: 126.7052 },
  인천광역시: { lat: 37.4563, lng: 126.7052 },
  광주: { lat: 35.1595, lng: 126.8526 },
  광주광역시: { lat: 35.1595, lng: 126.8526 },
  대전: { lat: 36.3504, lng: 127.3845 },
  대전광역시: { lat: 36.3504, lng: 127.3845 },
  울산: { lat: 35.5384, lng: 129.3114 },
  울산광역시: { lat: 35.5384, lng: 129.3114 },
  세종: { lat: 36.4800, lng: 127.2890 },
  세종특별자치시: { lat: 36.4800, lng: 127.2890 },
  경기: { lat: 37.4138, lng: 127.5183 },
  경기도: { lat: 37.4138, lng: 127.5183 },
  강원: { lat: 37.8228, lng: 128.1555 },
  강원특별자치도: { lat: 37.8228, lng: 128.1555 },
  충북: { lat: 36.6357, lng: 127.4913 },
  충청북도: { lat: 36.6357, lng: 127.4913 },
  충남: { lat: 36.5184, lng: 126.8 },
  충청남도: { lat: 36.5184, lng: 126.8 },
  전북: { lat: 35.7175, lng: 127.153 },
  전북특별자치도: { lat: 35.7175, lng: 127.153 },
  전남: { lat: 34.8161, lng: 126.463 },
  전라남도: { lat: 34.8161, lng: 126.463 },
  경북: { lat: 36.4919, lng: 128.8889 },
  경상북도: { lat: 36.4919, lng: 128.8889 },
  경남: { lat: 35.4606, lng: 128.2132 },
  경상남도: { lat: 35.4606, lng: 128.2132 },
  제주: { lat: 33.4996, lng: 126.5312 },
  제주특별자치도: { lat: 33.4996, lng: 126.5312 },
};

const getMockCount = (regionLabel: string) => {
  return (
    mockPostCountByRegion[regionLabel] ??
    mockPostCountByRegion[regionLabel.replace('특별시', '')] ??
    mockPostCountByRegion[regionLabel.replace('광역시', '')] ??
    mockPostCountByRegion[regionLabel.replace('특별자치시', '')] ??
    mockPostCountByRegion[regionLabel.replace('특별자치도', '')] ??
    mockPostCountByRegion[regionLabel.replace('도', '')] ??
    0
  );
};

const calcDistanceKm = (
  origin: { lat: number; lng: number },
  target: { lat: number; lng: number },
) => {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const earthRadiusKm = 6371;
  const dLat = toRad(target.lat - origin.lat);
  const dLng = toRad(target.lng - origin.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(origin.lat)) *
      Math.cos(toRad(target.lat)) *
      Math.sin(dLng / 2) ** 2;
  return earthRadiusKm * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export default function NearbyCompanies() {
  const [region, setRegion] = useState<string>('');
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { data } = useGetMapSido();

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCurrentPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => {
        setCurrentPosition({ lat: 37.5665, lng: 126.978 });
      },
    );
  }, []);

  const regionOptions = useMemo<Option[]>(() => {
    const sidoList = data?.data ?? [];
    if (sidoList.length === 0) {
      return selectRegionOptions;
    }
    return sidoList.map(sido => ({ value: sido, label: sido }));
  }, [data?.data]);

  const regionStats = useMemo(() => {
    const withDistance = regionOptions.map(option => {
      const regionCenter = regionCenters[option.label];
      const distance =
        currentPosition && regionCenter
          ? calcDistanceKm(currentPosition, regionCenter)
          : Number.POSITIVE_INFINITY;

      return {
        region: option.label,
        count: getMockCount(option.label),
        distance,
      };
    });

    return withDistance.sort((a, b) => a.distance - b.distance);
  }, [currentPosition, regionOptions]);

  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        <Select
          name='region'
          icon='map-pin'
          width='300px'
          options={regionOptions}
          value={region}
          onChange={setRegion}
        />
      </div>
      <div className={styles.content}>
        <section className={styles.mapArea}>
          <MapComponent level={6} />
        </section>
        <aside className={styles.statsArea}>
          <h2 className={styles.statsTitle}>가까운 지역별 채용공고</h2>
          <ul className={styles.statsList}>
            {regionStats.map(({ region: regionName, count, distance }, idx) => (
              <li
                key={regionName}
                className={`${styles.statsItem} ${
                  region === regionName ? styles.active : ''
                }`}
              >
                <div className={styles.regionInfo}>
                  <span className={styles.rankBadge}>{idx + 1}</span>
                  <div>
                    <div className={styles.regionName}>{regionName}</div>
                    <div className={styles.distance}>
                      {Number.isFinite(distance)
                        ? `${distance.toFixed(1)}km`
                        : '거리 계산 대기'}
                    </div>
                  </div>
                </div>
                <strong className={styles.count}>{count}건</strong>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
