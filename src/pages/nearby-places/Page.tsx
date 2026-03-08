import { AxiosError } from 'axios';
import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import { LocateFixed, Minus, Plus, Search } from 'lucide-react';
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

type PlaceCategory =
  | '할랄 식당'
  | '국가별 음식점'
  | '국가별 마트'
  | '종교 시설'
  | '외국인 지원센터'
  | '송금/환전소'
  | '기타';

interface Place {
  label: PlaceCategory;
  code: PlaceCategoryCode;
}

const categories: Place[] = [
  { label: '할랄 식당', code: 'HALAL_RESTAURANT' },
  { label: '국가별 음식점', code: 'ETHNIC_RESTAURANT' },
  { label: '국가별 마트', code: 'ETHNIC_MART' },
  { label: '종교 시설', code: 'RELIGIOUS_FACILITY' },
  { label: '외국인 지원센터', code: 'COMMUNITY_CENTER' },
  { label: '송금/환전소', code: 'MONEY_TRANSFER' },
  { label: '기타', code: 'OTHER' },
];

const categoryLabelByCode: Record<PlaceCategoryCode, PlaceCategory> = {
  HALAL_RESTAURANT: '할랄 식당',
  ETHNIC_RESTAURANT: '국가별 음식점',
  ETHNIC_MART: '국가별 마트',
  RELIGIOUS_FACILITY: '종교 시설',
  COMMUNITY_CENTER: '외국인 지원센터',
  MONEY_TRANSFER: '송금/환전소',
  OTHER: '기타',
};

const fallbackCategories: PlaceCategory[] = [
  '할랄 식당',
  '국가별 음식점',
  '국가별 마트',
  '종교 시설',
  '외국인 지원센터',
  '송금/환전소',
  '기타',
];

export default function NearbyPlaces() {
  const [keywordInput, setKeywordInput] = useState('');
  const [submittedKeyword, setSubmittedKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<PlaceCategory>('할랄 식당');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [mapLevel, setMapLevel] = useState(5);
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });
  const navigate = useNavigate();
  const { data: favoritesData } = useGetMapFavorites();
  const {
    mutate: postFavoritePlaceMutate,
    isPending: isPostingFavorite,
    error: postFavoriteError,
    reset: resetPostFavoriteError,
  } = usePostFavoritePlace();

  const selectedCategoryCode = useMemo(
    () =>
      categories.find(category => category.label === selectedCategory)?.code ??
      'HALAL_RESTAURANT',
    [selectedCategory],
  );

  const isKeywordMode = submittedKeyword.trim().length > 0;

  const {
    data: placesData,
    isLoading: isPlacesLoading,
    isError: isPlacesError,
  } = useGetPlaces(
    {
      lat: currentPosition.lat,
      lng: currentPosition.lng,
      radius: 5000,
      categories: [selectedCategoryCode],
      page: 0,
      size: 50,
    },
    !!currentPosition.lat && !!currentPosition.lng && !isKeywordMode,
  );

  const {
    data: searchedPlacesData,
    isLoading: isSearchedPlacesLoading,
    isError: isSearchedPlacesError,
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
      const isCategoryMatched =
        categoryLabelByCode[place.category] === selectedCategory;
      return isCategoryMatched;
    });
  }, [apiPlaces, selectedCategory]);
  const favoritePlaceIdSet = useMemo(
    () =>
      new Set((favoritesData?.data.places ?? []).map(place => place.placeId)),
    [favoritesData?.data.places],
  );
  const favoriteErrorCode = (
    postFavoriteError as AxiosError<{ code?: string }> | null
  )?.response?.data?.code;
  const favoriteErrorMessage = (() => {
    if (!favoriteErrorCode) return '';
    if (favoriteErrorCode === 'C002')
      return '요청 데이터가 올바르지 않습니다.';
    if (favoriteErrorCode === 'U001') return '사용자를 찾을 수 없습니다.';
    if (favoriteErrorCode === 'M005')
      return '이미 즐겨찾기에 등록된 장소입니다.';
    return '즐겨찾기 등록 중 오류가 발생했습니다.';
  })();

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

    if (favoritePlaceIdSet.has(placeId)) {
      setFavoriteMessage('이미 즐겨찾기에 등록된 장소입니다.');
      return;
    }

    postFavoritePlaceMutate(
      { placeId },
      {
        onSuccess: () => {
          setFavoriteMessage('즐겨찾기에 등록되었습니다.');
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

  return (
    <div className={styles.container}>
      <form className={styles.searchBox} onSubmit={handleSubmitSearch}>
        <Search size={18} className={styles.searchIcon} />
        <input
          value={keywordInput}
          onChange={e => setKeywordInput(e.target.value)}
          placeholder='장소명 또는 주소로 검색'
          className={styles.searchInput}
        />
        <button type='submit' className={styles.searchButton}>
          검색
        </button>
      </form>

      <div className={styles.categoryRow}>
        {categories.map(category => (
          <button
            key={category.code}
            type='button'
            className={`${styles.categoryButton} ${
              selectedCategory === category.label ? styles.activeCategory : ''
            }`}
            onClick={() => {
              setSelectedCategory(category.label);
              setSelectedPlaceId(null);
            }}
          >
            {category.label}
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
                  aria-label={`${place.name} 위치`}
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
                  <span>{categoryLabelByCode[selectedPlace.category]}</span>
                </div>
              </CustomOverlayMap>
            )}
          </Map>
          <div className={styles.mapControls}>
            <button
              type='button'
              className={styles.controlButton}
              onClick={moveToCurrentPosition}
              title='현재 위치로 이동'
              aria-label='현재 위치로 이동'
            >
              <LocateFixed size={18} />
            </button>
            <button
              type='button'
              className={styles.controlButton}
              onClick={zoomIn}
              title='지도 확대'
              aria-label='지도 확대'
            >
              <Plus size={18} />
            </button>
            <button
              type='button'
              className={styles.controlButton}
              onClick={zoomOut}
              title='지도 축소'
              aria-label='지도 축소'
            >
              <Minus size={18} />
            </button>
          </div>
        </section>

        <aside className={styles.listArea}>
          <h2 className={styles.listTitle}>
            장소 리스트
            <span className={styles.favoriteCount}>
              즐겨찾기 {favoritePlaceIdSet.size}
            </span>
          </h2>
          {isLoading ? (
            <div className={styles.emptyItem}>장소를 불러오는 중입니다.</div>
          ) : isError ? (
            <div className={styles.emptyItem}>
              장소 검색에 실패했습니다. 잠시 후 다시 시도해주세요.
            </div>
          ) : selectedPlace ? (
            <div className={styles.detailCard}>
              <h3>{selectedPlace.name}</h3>
              <p>{selectedPlace.subCategory || '상세 카테고리 정보 없음'}</p>
              <div>{selectedPlace.displayAddress}</div>
              <button
                type='button'
                className={styles.favoriteActionButton}
                onClick={event => handleFavoritePlace(event, selectedPlace.id)}
                disabled={isPostingFavorite || favoritePlaceIdSet.has(selectedPlace.id)}
              >
                {favoritePlaceIdSet.has(selectedPlace.id)
                  ? '즐겨찾기 등록됨'
                  : '즐겨찾기 등록'}
              </button>
              <div>팁 {selectedPlace.tipCount}개</div>
            </div>
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
                <strong>
                  {place.name}
                  <button
                    type='button'
                    className={styles.favoriteMark}
                    onClick={event => handleFavoritePlace(event, place.id)}
                    disabled={isPostingFavorite}
                    aria-label='장소 즐겨찾기 등록'
                  >
                    {favoritePlaceIdSet.has(place.id) ? '★' : '☆'}
                  </button>
                </strong>
                <div>{categoryLabelByCode[place.category] || fallbackCategories[6]}</div>
                <div>{place.displayAddress}</div>
              </li>
            ))}
            {filteredPlaces.length === 0 && (
              <li className={styles.emptyItem}>조건에 맞는 장소가 없습니다.</li>
            )}
          </ul>
        </aside>
      </div>
    </div>
  );
}
