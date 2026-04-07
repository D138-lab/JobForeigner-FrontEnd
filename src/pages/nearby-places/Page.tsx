import { AxiosError } from 'axios';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import {
  ArrowUpRight,
  LocateFixed,
  MapPin,
  Minus,
  Plus,
  Search,
} from 'lucide-react';
import useDeleteFavoritePlace from '@/lib/apis/mutations/useDeleteFavoritePlace';
import usePostFavoritePlace from '@/lib/apis/mutations/usePostFavoritePlace';
import useGetPlaces, {
  PlaceCategoryCode,
  PlaceItem,
} from '@/lib/apis/queries/useGetPlaces';
import useGetMapFavorites from '@/lib/apis/queries/useGetMapFavorites';
import useSearchPlaces from '@/lib/apis/queries/useSearchPlaces';
import { useNavigate } from 'react-router-dom';
import styles from './page.module.scss';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import UnAuthorizedModal from '@/components/common/unauthorized/UnAuthorizedModal';

const categories: PlaceCategoryCode[] = [
  'HALAL_RESTAURANT',
  'ETHNIC_RESTAURANT',
  'ETHNIC_MART',
  'RELIGIOUS_FACILITY',
  'COMMUNITY_CENTER',
  'MONEY_TRANSFER',
  'OTHER',
];

export default function NearbyPlaces() {
  const { t } = useTranslation('pages');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [keywordInput, setKeywordInput] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<PlaceCategoryCode>('HALAL_RESTAURANT');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [mapLevel, setMapLevel] = useState(5);
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const navigate = useNavigate();
  const { data: favoritesData, error: favoritesError } = useGetMapFavorites();
  const {
    mutate: postFavoritePlaceMutate,
    isPending: isPostingFavorite,
    error: postFavoriteError,
    reset: resetPostFavoriteError,
  } = usePostFavoritePlace();
  const {
    mutate: deleteFavoritePlaceMutate,
    isPending: isDeletingFavorite,
    error: deleteFavoriteError,
    reset: resetDeleteFavoriteError,
  } = useDeleteFavoritePlace();

  const isKeywordMode = submittedKeyword.trim().length > 0;

  const {
    data: placesData,
    isLoading: isPlacesLoading,
    isError: isPlacesError,
    error: placesError,
  } = useGetPlaces(
    {
      lat: currentPosition.lat,
      lng: currentPosition.lng,
      radius: 5000,
      categories: [selectedCategory],
      page: 0,
      size: 50,
    },
    !!currentPosition.lat && !!currentPosition.lng && !isKeywordMode,
  );

  const {
    data: searchedPlacesData,
    isLoading: isSearchedPlacesLoading,
    isError: isSearchedPlacesError,
    error: searchedPlacesError,
  } = useSearchPlaces(
    submittedKeyword,
    0,
    50,
    isKeywordMode,
  );

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

  const activeData = isKeywordMode ? searchedPlacesData : placesData;
  const isLoading = isKeywordMode ? isSearchedPlacesLoading : isPlacesLoading;
  const isError = isKeywordMode ? isSearchedPlacesError : isPlacesError;

  const apiPlaces = activeData?.data.places ?? [];
  const searchCenter = activeData?.data.searchCenter?.approximateCenter ?? null;

  const getPlacePosition = (place: PlaceItem, index: number) => {
    if (typeof place.lat === 'number' && typeof place.lng === 'number') {
      return { lat: place.lat, lng: place.lng };
    }

    const center = searchCenter ?? currentPosition;
    const spread = 0.006;
    const angle = ((place.id + index) % 360) * (Math.PI / 180);
    return {
      lat: center.lat + Math.sin(angle) * spread,
      lng: center.lng + Math.cos(angle) * spread,
    };
  };

  const filteredPlaces = useMemo(() => {
    return apiPlaces.filter(place => {
      return place.category === selectedCategory;
    });
  }, [apiPlaces, selectedCategory]);
  const favoritePlaceIdSet = useMemo(
    () =>
      new Set((favoritesData?.data.places ?? []).map(place => place.placeId)),
    [favoritesData?.data.places],
  );
  const postFavoriteErrorCode = (
    postFavoriteError as AxiosError<{ code?: string }> | null
  )?.response?.data?.code;
  const deleteFavoriteErrorCode = (
    deleteFavoriteError as AxiosError<{ code?: string }> | null
  )?.response?.data?.code;
  const favoriteErrorMessage = (() => {
    if (postFavoriteErrorCode === 'C002')
      return t('nearbyPlaces.errors.invalidRequest');
    if (postFavoriteErrorCode === 'U001')
      return t('nearbyPlaces.errors.memberNotFound');
    if (postFavoriteErrorCode === 'M005')
      return t('nearbyPlaces.errors.favoriteAlreadyExists');
    if (deleteFavoriteErrorCode === 'M006')
      return t('nearbyPlaces.errors.favoriteNotFound');
    if (postFavoriteErrorCode) return t('nearbyPlaces.errors.favoriteAddFail');
    if (deleteFavoriteErrorCode)
      return t('nearbyPlaces.errors.favoriteDeleteFail');
    return '';
  })();
  const isFavoritePending = isPostingFavorite || isDeletingFavorite;
  const isUnauthorized =
    !isLoggedIn ||
    [favoritesError, placesError, searchedPlacesError].some(
      error => error?.message === 'Request failed with status code 401',
    );

  const selectedPlace = useMemo(
    () =>
      filteredPlaces.find(place => place.id === selectedPlaceId) ??
      filteredPlaces[0] ??
      null,
    [filteredPlaces, selectedPlaceId],
  );

  const mapCenter = selectedPlace
    ? getPlacePosition(selectedPlace, 0)
    : searchCenter ?? currentPosition;

  const handleSelectPlace = (placeId: number) => {
    setSelectedPlaceId(placeId);
    const place = filteredPlaces.find(item => item.id === placeId) ?? null;
    if (map && place) {
      const position = getPlacePosition(place, 0);
      map.panTo(new kakao.maps.LatLng(position.lat, position.lng));
    }
    navigate(`/nearby-places/${placeId}`);
  };

  const handleFavoritePlace = (
    event: React.MouseEvent<HTMLElement>,
    placeId: number,
  ) => {
    event.stopPropagation();
    setFavoriteMessage('');
    resetPostFavoriteError();
    resetDeleteFavoriteError();

    if (favoritePlaceIdSet.has(placeId)) {
      deleteFavoritePlaceMutate(placeId, {
        onSuccess: () => {
          setFavoriteMessage(t('nearbyPlaces.messages.favoriteRemoved'));
        },
      });
      return;
    }

    postFavoritePlaceMutate(
      { placeId },
      {
        onSuccess: () => {
          setFavoriteMessage(t('nearbyPlaces.messages.favoriteAdded'));
        },
      },
    );
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedKeyword(keywordInput.trim());
    setSelectedPlaceId(null);
  };

  const moveToCurrentPosition = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(pos => {
      const nextPosition = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      setCurrentPosition(nextPosition);
      map?.panTo(new kakao.maps.LatLng(nextPosition.lat, nextPosition.lng));
    });
  };

  const zoomIn = () => setMapLevel(prev => Math.max(1, prev - 1));
  const zoomOut = () => setMapLevel(prev => Math.min(14, prev + 1));
  const listCount = filteredPlaces.length;

  return (
    <div className={styles.container}>
      {isUnauthorized && (
        <div className={styles.unAuthorizedModal}>
          <UnAuthorizedModal />
        </div>
      )}
      <form className={styles.searchBox} onSubmit={handleSubmitSearch}>
        <Search size={18} className={styles.searchIcon} />
        <input
          value={keywordInput}
          onChange={e => setKeywordInput(e.target.value)}
          placeholder={t('nearbyPlaces.searchPlaceholder')}
          className={styles.searchInput}
        />
        <button type='submit' className={styles.searchButton}>
          {t('nearbyPlaces.searchButton')}
        </button>
      </form>

      <div className={styles.categoryRow}>
        {categories.map(category => (
          <button
            key={category}
            type='button'
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.activeCategory : ''
            }`}
            onClick={() => {
              setSelectedCategory(category);
              setSelectedPlaceId(null);
            }}
          >
            {t(`nearbyPlaces.categories.${category}`)}
          </button>
        ))}
      </div>
      {favoriteMessage ? (
        <div className={styles.favoriteSuccess}>{favoriteMessage}</div>
      ) : null}
      {favoriteErrorMessage ? (
        <div className={styles.favoriteError}>{favoriteErrorMessage}</div>
      ) : null}

      <div className={styles.content}>
        <section className={styles.mapArea}>
          <Map
            center={mapCenter}
            level={mapLevel}
            style={{ width: '100%', height: '620px' }}
            onCreate={setMap}
          >
            <CustomOverlayMap position={currentPosition}>
              <div className={styles.currentPin} />
            </CustomOverlayMap>
            {filteredPlaces.map(place => (
              <CustomOverlayMap
                key={place.id}
                position={getPlacePosition(place, 0)}
              >
                <button
                  type='button'
                  className={`${styles.placePin} ${
                    selectedPlace?.id === place.id ? styles.activePlacePin : ''
                  }`}
                  onClick={() => handleSelectPlace(place.id)}
                  aria-label={t('nearbyPlaces.pinAria', { name: place.name })}
                  title={place.name}
                />
              </CustomOverlayMap>
            ))}
            {selectedPlace && (
              <CustomOverlayMap
                position={getPlacePosition(selectedPlace, 0)}
              >
                <div className={styles.overlayCard}>
                  <strong>{selectedPlace.name}</strong>
                  <span>{t(`nearbyPlaces.categories.${selectedPlace.category}`)}</span>
                </div>
              </CustomOverlayMap>
            )}
          </Map>
          <div className={styles.mapControls}>
            <button
              type='button'
              className={styles.controlButton}
              onClick={moveToCurrentPosition}
              title={t('nearbyPlaces.controls.moveCurrent')}
              aria-label={t('nearbyPlaces.controls.moveCurrent')}
            >
              <LocateFixed size={18} />
            </button>
            <button
              type='button'
              className={styles.controlButton}
              onClick={zoomIn}
              title={t('nearbyPlaces.controls.zoomIn')}
              aria-label={t('nearbyPlaces.controls.zoomIn')}
            >
              <Plus size={18} />
            </button>
            <button
              type='button'
              className={styles.controlButton}
              onClick={zoomOut}
              title={t('nearbyPlaces.controls.zoomOut')}
              aria-label={t('nearbyPlaces.controls.zoomOut')}
            >
              <Minus size={18} />
            </button>
          </div>
        </section>

        <aside className={styles.listArea}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>{t('nearbyPlaces.listTitle')}</h2>
            <div className={styles.listMeta}>
              <span className={styles.resultCount}>{listCount}</span>
              <span className={styles.favoriteCount}>
                {t('nearbyPlaces.favoriteCount', { count: favoritePlaceIdSet.size })}
              </span>
            </div>
          </div>
          {isLoading ? (
            <div className={styles.emptyItem}>{t('nearbyPlaces.loadingPlaces')}</div>
          ) : isError ? (
            <div className={styles.emptyItem}>{t('nearbyPlaces.errors.searchFail')}</div>
          ) : null}
          <ul className={styles.placeList}>
            {filteredPlaces.map(place => (
              <li
                key={place.id}
                className={`${styles.placeItem} ${
                  selectedPlace?.id === place.id ? styles.activePlace : ''
                }`}
                onClick={() => handleSelectPlace(place.id)}
              >
                <div className={styles.placeItemHeader}>
                  <strong>{place.name}</strong>
                  <button
                    type='button'
                    className={styles.favoriteMark}
                    onClick={event => handleFavoritePlace(event, place.id)}
                    disabled={isFavoritePending}
                    aria-label={t('nearbyPlaces.favoriteAria')}
                  >
                    {favoritePlaceIdSet.has(place.id) ? '★' : '☆'}
                  </button>
                </div>
                <div className={styles.placeCategoryRow}>
                  <span className={styles.placeCategory}>
                    {t(`nearbyPlaces.categories.${place.category}`)}
                  </span>
                  {place.subCategory ? (
                    <span className={styles.placeSubCategory}>{place.subCategory}</span>
                  ) : null}
                </div>
                <div className={styles.placeAddress}>
                  <MapPin size={14} />
                  <span>{place.displayAddress}</span>
                </div>
                <div className={styles.placeItemFooter}>
                  <span className={styles.tipBadge}>
                    {t('nearbyPlaces.tipCount', { count: place.tipCount })}
                  </span>
                  <span className={styles.detailLink} aria-hidden='true'>
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </li>
            ))}
            {filteredPlaces.length === 0 && (
              <li className={styles.emptyItem}>{t('nearbyPlaces.emptyMatched')}</li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}
