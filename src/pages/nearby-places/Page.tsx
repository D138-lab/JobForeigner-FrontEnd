import { CustomOverlayMap, Map } from 'react-kakao-maps-sdk';
import { LocateFixed, Minus, Plus, Search } from 'lucide-react';
import useGetPlaces, {
  PlaceCategoryCode,
  PlaceItem,
} from '@/lib/apis/queries/useGetPlaces';
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
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<PlaceCategory>('할랄 식당');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [mapLevel, setMapLevel] = useState(5);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

  const selectedCategoryCode = useMemo(
    () =>
      categories.find(category => category.label === selectedCategory)?.code ??
      'HALAL_RESTAURANT',
    [selectedCategory],
  );

  const { data, isLoading, isError, refetch } = useGetPlaces(
    {
      lat: currentPosition.lat,
      lng: currentPosition.lng,
      radius: 5000,
      categories: [selectedCategoryCode],
      page: 0,
      size: 50,
    },
    !!currentPosition.lat && !!currentPosition.lng,
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

  const apiPlaces = data?.data.places ?? [];
  const searchCenter = data?.data.searchCenter?.approximateCenter ?? null;

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
      const normalizedKeyword = keyword.trim().toLowerCase();
      if (!normalizedKeyword) return isCategoryMatched;
      return (
        isCategoryMatched &&
        (place.name.toLowerCase().includes(normalizedKeyword) ||
          place.displayAddress.toLowerCase().includes(normalizedKeyword))
      );
    });
  }, [apiPlaces, keyword, selectedCategory]);

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
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(keywordInput);
    setSelectedPlaceId(null);
    void refetch();
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
          <h2 className={styles.listTitle}>장소 리스트</h2>
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
                <strong>{place.name}</strong>
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
