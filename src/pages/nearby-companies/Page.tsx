import { AxiosError } from 'axios';
import Select, { Option } from '@/components/common/select/Select';
import { selectRegionOptions } from '@/components/jobs/DetailSearchForm';
import { MapComponent } from '@/components/nearby-companies/mapComponent/MapComponent';
import usePostFavoriteRegion from '@/lib/apis/mutations/usePostFavoriteRegion';
import useGetMapFavorites from '@/lib/apis/queries/useGetMapFavorites';
import useGetMapJobPostClusters from '@/lib/apis/queries/useGetMapJobPostClusters';
import useGetMapSido from '@/lib/apis/queries/useGetMapSido';
import useGetRegionJobPosts from '@/lib/apis/queries/useGetRegionJobPosts';
import useGetSidoRegions from '@/lib/apis/queries/useGetSidoRegions';
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
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const [currentPosition, setCurrentPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const { data: sidoData } = useGetMapSido();
  const { data: regionsData } = useGetSidoRegions(selectedSido);
  const { data: clusterData } = useGetMapJobPostClusters(selectedSido);
  const { data: favoritesData } = useGetMapFavorites();
  const {
    mutate: postFavoriteRegionMutate,
    isPending: isPostingFavoriteRegion,
    error: postFavoriteRegionError,
    reset: resetPostFavoriteRegionError,
  } = usePostFavoriteRegion();

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

  const clusterByRegionCode = useMemo(
    () =>
      (clusterData?.data.clusters ?? []).reduce<
        Record<
          string,
          { jobPostCount: number; center: { lat: number; lng: number } }
        >
      >((acc, cluster) => {
        acc[cluster.regionCode] = {
          jobPostCount: cluster.jobPostCount,
          center: cluster.center,
        };
        return acc;
      }, {}),
    [clusterData?.data.clusters],
  );

  const sortedRegions = useMemo(() => {
    const withDistance = (regionsData?.data ?? []).map(region => {
      const center = clusterByRegionCode[region.regionCode]?.center;
      const distance =
        currentPosition && center
          ? calcDistanceKm(currentPosition, center)
          : currentPosition && region.approximateCenter
            ? calcDistanceKm(currentPosition, region.approximateCenter)
          : Number.POSITIVE_INFINITY;

      return {
        regionCode: region.regionCode,
        regionName: region.regionName,
        count: clusterByRegionCode[region.regionCode]?.jobPostCount ?? 0,
        distance,
      };
    });

    return withDistance.sort((a, b) => a.distance - b.distance);
  }, [clusterByRegionCode, currentPosition, regionsData?.data]);

  useEffect(() => {
    if (sortedRegions.length === 0) {
      setSelectedRegionCode('');
      return;
    }
    if (!sortedRegions.some(region => region.regionCode === selectedRegionCode)) {
      setSelectedRegionCode(sortedRegions[0].regionCode);
    }
  }, [selectedRegionCode, sortedRegions]);

  const { data: selectedRegionPostData, isLoading: isSelectedRegionPostsLoading } =
    useGetRegionJobPosts(selectedRegionCode, !!selectedRegionCode);

  const selectedRegionPosts = selectedRegionPostData?.data ?? [];

  const selectedRegionName =
    sortedRegions.find(region => region.regionCode === selectedRegionCode)
      ?.regionName ?? '';

  const mapClusters = useMemo(
    () =>
      (clusterData?.data.clusters ?? []).map(cluster => ({
        regionCode: cluster.regionCode,
        regionName: cluster.regionName,
        lat: cluster.center.lat,
        lng: cluster.center.lng,
        jobPostCount: cluster.jobPostCount,
      })),
    [clusterData?.data.clusters],
  );
  const favoriteRegionCodeSet = useMemo(
    () =>
      new Set((favoritesData?.data.regions ?? []).map(region => region.regionCode)),
    [favoritesData?.data.regions],
  );
  const postFavoriteRegionErrorCode = (
    postFavoriteRegionError as AxiosError<{ code?: string }> | null
  )?.response?.data?.code;
  const favoriteErrorMessage = (() => {
    if (!postFavoriteRegionErrorCode) return '';
    if (postFavoriteRegionErrorCode === 'C002')
      return '요청 데이터가 올바르지 않습니다.';
    if (postFavoriteRegionErrorCode === 'U001')
      return '사용자를 찾을 수 없습니다.';
    if (postFavoriteRegionErrorCode === 'M005')
      return '이미 즐겨찾기에 등록된 지역입니다.';
    return '즐겨찾기 등록 중 오류가 발생했습니다.';
  })();

  const handleFavoriteRegion = (
    event: React.MouseEvent<HTMLButtonElement>,
    regionCode: string,
    regionName: string,
  ) => {
    event.stopPropagation();
    setFavoriteMessage('');
    resetPostFavoriteRegionError();

    if (favoriteRegionCodeSet.has(regionCode)) {
      setFavoriteMessage('이미 즐겨찾기에 등록된 지역입니다.');
      return;
    }

    postFavoriteRegionMutate(
      {
        regionCode,
        regionName,
        notifyNewJobPost: true,
      },
      {
        onSuccess: () => {
          setFavoriteMessage('지역 즐겨찾기에 등록되었습니다.');
        },
      },
    );
  };

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
          <MapComponent
            level={6}
            clusters={mapClusters}
            selectedRegionCode={selectedRegionCode}
            onSelectRegion={setSelectedRegionCode}
          />
        </section>
        <aside className={styles.statsArea}>
          <h2 className={styles.statsTitle}>
            가까운 지역별 채용공고
            <span className={styles.favoriteCount}>
              즐겨찾기 {favoriteRegionCodeSet.size}
            </span>
          </h2>
          {favoriteMessage ? (
            <div className={styles.favoriteSuccess}>{favoriteMessage}</div>
          ) : null}
          {favoriteErrorMessage ? (
            <div className={styles.favoriteError}>{favoriteErrorMessage}</div>
          ) : null}
          <ul className={styles.statsList}>
            {sortedRegions.map(({ regionCode, regionName, count, distance }, idx) => (
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
                    <div className={styles.regionName}>
                      {regionName}
                      <button
                        type='button'
                        className={styles.favoriteMarkButton}
                        onClick={event =>
                          handleFavoriteRegion(event, regionCode, regionName)
                        }
                        disabled={isPostingFavoriteRegion}
                        aria-label='지역 즐겨찾기 등록'
                      >
                        {favoriteRegionCodeSet.has(regionCode) ? '★' : '☆'}
                      </button>
                    </div>
                    <div className={styles.distance}>
                      {Number.isFinite(distance)
                        ? `${distance.toFixed(1)}km`
                        : '거리 계산 대기'}
                    </div>
                  </div>
                </div>
                <strong className={styles.count}>
                  {count}건
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
