import Select, { Option } from '@/components/common/select/Select';
import { selectRegionOptions } from '@/components/jobs/DetailSearchForm';
import { MapComponent } from '@/components/nearby-companies/mapComponent/MapComponent';
import useGetMapSido from '@/lib/apis/queries/useGetMapSido';
import { getRegionJobPosts } from '@/lib/apis/queries/useGetRegionJobPosts';
import useGetSidoRegions from '@/lib/apis/queries/useGetSidoRegions';
import { useQueries } from '@tanstack/react-query';
import styles from './page.module.scss';
import { useEffect, useMemo, useState } from 'react';

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
  const [selectedSido, setSelectedSido] = useState<string>('');
  const [selectedRegionCode, setSelectedRegionCode] = useState<string>('');
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { data: sidoData } = useGetMapSido();
  const { data: regionsData } = useGetSidoRegions(selectedSido);

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
    const sidoList = sidoData?.data ?? [];
    if (sidoList.length === 0) {
      return selectRegionOptions.filter(option => option.value !== 'ALL');
    }
    return sidoList.map(sido => ({ value: sido, label: sido }));
  }, [sidoData?.data]);

  useEffect(() => {
    if (!selectedSido && regionOptions.length > 0) {
      setSelectedSido(regionOptions[0].value);
    }
  }, [regionOptions, selectedSido]);

  const sortedRegions = useMemo(() => {
    const withDistance = (regionsData?.data ?? []).map(region => {
      const distance =
        currentPosition && region.approximateCenter
          ? calcDistanceKm(currentPosition, region.approximateCenter)
          : Number.POSITIVE_INFINITY;

      return {
        regionCode: region.regionCode,
        regionName: region.regionName,
        distance,
      };
    });

    return withDistance.sort((a, b) => a.distance - b.distance);
  }, [currentPosition, regionsData?.data]);

  useEffect(() => {
    if (sortedRegions.length === 0) {
      setSelectedRegionCode('');
      return;
    }
    if (!sortedRegions.some(region => region.regionCode === selectedRegionCode)) {
      setSelectedRegionCode(sortedRegions[0].regionCode);
    }
  }, [selectedRegionCode, sortedRegions]);

  const regionPostQueries = useQueries({
    queries: sortedRegions.map(region => ({
      queryKey: ['useGetRegionJobPosts', region.regionCode],
      queryFn: () => getRegionJobPosts(region.regionCode),
      enabled: !!region.regionCode,
    })),
  });

  const postCountByRegionCode = useMemo(() => {
    return sortedRegions.reduce<Record<string, number>>((acc, region, idx) => {
      acc[region.regionCode] = regionPostQueries[idx]?.data?.data.length ?? 0;
      return acc;
    }, {});
  }, [regionPostQueries, sortedRegions]);

  const selectedRegionIndex = sortedRegions.findIndex(
    region => region.regionCode === selectedRegionCode,
  );

  const selectedRegionPosts =
    selectedRegionIndex >= 0
      ? (regionPostQueries[selectedRegionIndex]?.data?.data ?? [])
      : [];

  const isSelectedRegionPostsLoading =
    selectedRegionIndex >= 0
      ? !!regionPostQueries[selectedRegionIndex]?.isLoading
      : false;

  const selectedRegionName =
    sortedRegions.find(region => region.regionCode === selectedRegionCode)
      ?.regionName ?? '';

  return (
    <div className={styles.container}>
      <div className={styles.filterRow}>
        <Select
          name='region'
          icon='map-pin'
          width='300px'
          options={regionOptions}
          value={selectedSido}
          onChange={setSelectedSido}
        />
      </div>
      <div className={styles.content}>
        <section className={styles.mapArea}>
          <MapComponent level={6} />
        </section>
        <aside className={styles.statsArea}>
          <h2 className={styles.statsTitle}>가까운 지역별 채용공고</h2>
          <ul className={styles.statsList}>
            {sortedRegions.map(({ regionCode, regionName, distance }, idx) => (
              <li
                key={regionCode}
                className={`${styles.statsItem} ${
                  selectedRegionCode === regionCode ? styles.active : ''
                }`}
                onClick={() => setSelectedRegionCode(regionCode)}
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
                <strong className={styles.count}>
                  {postCountByRegionCode[regionCode] ?? 0}건
                </strong>
              </li>
            ))}
          </ul>
          <div className={styles.postListSection}>
            <h3 className={styles.postListTitle}>
              {selectedRegionName ? `${selectedRegionName} 채용공고` : '채용공고'}
            </h3>
            {isSelectedRegionPostsLoading ? (
              <p className={styles.postListEmpty}>채용공고를 불러오는 중입니다.</p>
            ) : selectedRegionPosts.length === 0 ? (
              <p className={styles.postListEmpty}>등록된 채용공고가 없습니다.</p>
            ) : (
              <ul className={styles.postList}>
                {selectedRegionPosts.map(post => (
                  <li key={post.id} className={styles.postItem}>
                    <strong className={styles.postTitle}>{post.title}</strong>
                    <div className={styles.postMeta}>
                      {post.companyName} · {post.employmentType}
                    </div>
                    <div className={styles.postMeta}>{post.displayLocation}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
