import { AxiosError } from 'axios';
import Select, { Option } from '@/components/common/select/Select';
import { selectRegionOptions } from '@/components/jobs/DetailSearchForm';
import { MapComponent } from '@/components/nearby-companies/mapComponent/MapComponent';
import useDeleteFavoriteRegion from '@/lib/apis/mutations/useDeleteFavoriteRegion';
import usePatchFavoriteRegionNotification from '@/lib/apis/mutations/usePatchFavoriteRegionNotification';
import usePostFavoriteRegion from '@/lib/apis/mutations/usePostFavoriteRegion';
import useGetMapFavorites from '@/lib/apis/queries/useGetMapFavorites';
import useGetMapJobPostClusters from '@/lib/apis/queries/useGetMapJobPostClusters';
import useGetMapSido from '@/lib/apis/queries/useGetMapSido';
import useGetRegionJobPosts from '@/lib/apis/queries/useGetRegionJobPosts';
import useGetSidoRegions from '@/lib/apis/queries/useGetSidoRegions';
import styles from './page.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('pages');
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
  const {
    mutate: deleteFavoriteRegionMutate,
    isPending: isDeletingFavoriteRegion,
    error: deleteFavoriteRegionError,
    reset: resetDeleteFavoriteRegionError,
  } = useDeleteFavoriteRegion();
  const {
    mutate: patchFavoriteRegionNotificationMutate,
    isPending: isPatchingFavoriteRegionNotification,
    error: patchFavoriteRegionNotificationError,
    reset: resetPatchFavoriteRegionNotificationError,
  } = usePatchFavoriteRegionNotification();

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
  const favoriteRegionMap = useMemo(
    () =>
      new Map(
        (favoritesData?.data.regions ?? []).map(region => [
          region.regionCode,
          region,
        ]),
      ),
    [favoritesData?.data.regions],
  );
  const postFavoriteRegionErrorCode = (
    postFavoriteRegionError as AxiosError<{ code?: string }> | null
  )?.response?.data?.code;
  const deleteFavoriteRegionErrorCode = (
    deleteFavoriteRegionError as AxiosError<{ code?: string }> | null
  )?.response?.data?.code;
  const patchFavoriteRegionNotificationErrorCode = (
    patchFavoriteRegionNotificationError as AxiosError<{ code?: string }> | null
  )?.response?.data?.code;
  const favoriteErrorMessage = (() => {
    if (postFavoriteRegionErrorCode === 'C002')
      return t('nearbyCompanies.errors.invalidRequest');
    if (postFavoriteRegionErrorCode === 'U001')
      return t('nearbyCompanies.errors.memberNotFound');
    if (postFavoriteRegionErrorCode === 'M005')
      return t('nearbyCompanies.errors.favoriteAlreadyExists');
    if (deleteFavoriteRegionErrorCode === 'M006')
      return t('nearbyCompanies.errors.favoriteNotFound');
    if (patchFavoriteRegionNotificationErrorCode === 'M006')
      return t('nearbyCompanies.errors.favoriteNotFound');
    if (postFavoriteRegionErrorCode)
      return t('nearbyCompanies.errors.favoriteAddFail');
    if (deleteFavoriteRegionErrorCode)
      return t('nearbyCompanies.errors.favoriteDeleteFail');
    if (patchFavoriteRegionNotificationErrorCode)
      return t('nearbyCompanies.errors.notificationToggleFail');
    return '';
  })();
  const isFavoriteRegionPending =
    isPostingFavoriteRegion ||
    isDeletingFavoriteRegion ||
    isPatchingFavoriteRegionNotification;

  const handleFavoriteRegion = (
    event: React.MouseEvent<HTMLButtonElement>,
    regionCode: string,
    regionName: string,
  ) => {
    event.stopPropagation();
    setFavoriteMessage('');
    resetPostFavoriteRegionError();
    resetDeleteFavoriteRegionError();
    resetPatchFavoriteRegionNotificationError();

    if (favoriteRegionCodeSet.has(regionCode)) {
      deleteFavoriteRegionMutate(regionCode, {
        onSuccess: () => {
          setFavoriteMessage(t('nearbyCompanies.messages.favoriteRemoved'));
        },
      });
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
          setFavoriteMessage(t('nearbyCompanies.messages.favoriteAdded'));
        },
      },
    );
  };

  const handleToggleRegionNotification = (
    event: React.MouseEvent<HTMLButtonElement>,
    regionCode: string,
  ) => {
    event.stopPropagation();
    setFavoriteMessage('');
    resetPostFavoriteRegionError();
    resetDeleteFavoriteRegionError();
    resetPatchFavoriteRegionNotificationError();

    patchFavoriteRegionNotificationMutate(regionCode, {
      onSuccess: () => {
        setFavoriteMessage(t('nearbyCompanies.messages.notificationUpdated'));
      },
    });
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
            {t('nearbyCompanies.statsTitle')}
            <span className={styles.favoriteCount}>
              {t('nearbyCompanies.favoriteCount', {
                count: favoriteRegionCodeSet.size,
              })}
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
                  <div className={styles.regionText}>
                    <div className={styles.regionName}>
                      {regionName}
                      <button
                        type='button'
                        className={styles.favoriteMarkButton}
                        onClick={event =>
                          handleFavoriteRegion(event, regionCode, regionName)
                        }
                        disabled={isFavoriteRegionPending}
                        aria-label={t('nearbyCompanies.favoriteAria')}
                      >
                        {favoriteRegionCodeSet.has(regionCode) ? '★' : '☆'}
                      </button>
                      {favoriteRegionCodeSet.has(regionCode) ? (
                        <button
                          type='button'
                          className={styles.notificationToggleButton}
                          onClick={event =>
                            handleToggleRegionNotification(event, regionCode)
                          }
                          disabled={isFavoriteRegionPending}
                        >
                          {favoriteRegionMap.get(regionCode)?.notifyNewJobPost
                            ? t('nearbyCompanies.notificationOn')
                            : t('nearbyCompanies.notificationOff')}
                        </button>
                      ) : null}
                    </div>
                    <div className={styles.distance}>
                      {Number.isFinite(distance)
                        ? `${distance.toFixed(1)}km`
                        : t('nearbyCompanies.distancePending')}
                    </div>
                  </div>
                </div>
                <strong className={styles.count}>
                  {t('nearbyCompanies.postCount', { count })}
                </strong>
              </li>
            ))}
          </ul>
          <div className={styles.postListSection}>
            <h3 className={styles.postListTitle}>
              {selectedRegionName
                ? t('nearbyCompanies.regionPostsTitle', {
                    regionName: selectedRegionName,
                  })
                : t('nearbyCompanies.regionPostsTitleFallback')}
            </h3>
            {isSelectedRegionPostsLoading ? (
              <p className={styles.postListEmpty}>{t('nearbyCompanies.loadingPosts')}</p>
            ) : selectedRegionPosts.length === 0 ? (
              <p className={styles.postListEmpty}>{t('nearbyCompanies.emptyPosts')}</p>
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
