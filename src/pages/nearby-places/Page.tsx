import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import { LocateFixed, Minus, Plus, Search } from 'lucide-react';
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
  id: number;
  name: string;
  category: PlaceCategory;
  address: string;
  phone: string;
  description: string;
  lat: number;
  lng: number;
}

const categories: PlaceCategory[] = [
  '할랄 식당',
  '국가별 음식점',
  '국가별 마트',
  '종교 시설',
  '외국인 지원센터',
  '송금/환전소',
  '기타',
];

const mockPlaces: Place[] = [
  {
    id: 1,
    name: '안산 할랄 키친',
    category: '할랄 식당',
    address: '경기 안산시 단원구 중앙대로 927',
    phone: '031-111-2233',
    description: '무슬림 친화 메뉴와 영어 안내가 가능한 식당입니다.',
    lat: 37.3205,
    lng: 126.8307,
  },
  {
    id: 2,
    name: '이태원 글로벌 마트',
    category: '국가별 마트',
    address: '서울 용산구 이태원로 188',
    phone: '02-543-7788',
    description: '동남아 및 중동 식재료를 중심으로 취급합니다.',
    lat: 37.5346,
    lng: 126.9942,
  },
  {
    id: 3,
    name: '서울 외국인 지원센터',
    category: '외국인 지원센터',
    address: '서울 영등포구 국회대로 53길 20',
    phone: '02-3210-4000',
    description: '비자, 노동, 생활 상담을 다국어로 제공합니다.',
    lat: 37.5236,
    lng: 126.9055,
  },
  {
    id: 4,
    name: '부산 환전 라운지',
    category: '송금/환전소',
    address: '부산 해운대구 구남로 24',
    phone: '051-222-3333',
    description: '주요 통화 환전과 해외송금 서비스를 제공합니다.',
    lat: 35.1601,
    lng: 129.1604,
  },
  {
    id: 5,
    name: '인천 평화 사원',
    category: '종교 시설',
    address: '인천 연수구 센트럴로 160',
    phone: '032-777-0101',
    description: '예배 시간 및 커뮤니티 모임 정보를 제공합니다.',
    lat: 37.3852,
    lng: 126.6542,
  },
  {
    id: 6,
    name: '대구 아시아 푸드 스트리트',
    category: '국가별 음식점',
    address: '대구 중구 중앙대로 406',
    phone: '053-616-5252',
    description: '태국, 베트남, 인도 음식점을 한 곳에서 찾을 수 있습니다.',
    lat: 35.8697,
    lng: 128.6062,
  },
];

export default function NearbyPlaces() {
  const [keywordInput, setKeywordInput] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<PlaceCategory>('할랄 식당');
  const [selectedPlaceId, setSelectedPlaceId] = useState<number | null>(
    mockPlaces[0]?.id ?? null,
  );
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [mapLevel, setMapLevel] = useState(5);
  const [currentPosition, setCurrentPosition] = useState({
    lat: 37.5665,
    lng: 126.978,
  });

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

  const filteredPlaces = useMemo(() => {
    return mockPlaces.filter(place => {
      const isCategoryMatched = place.category === selectedCategory;
      const normalizedKeyword = keyword.trim().toLowerCase();
      if (!normalizedKeyword) return isCategoryMatched;
      return (
        isCategoryMatched &&
        (place.name.toLowerCase().includes(normalizedKeyword) ||
          place.address.toLowerCase().includes(normalizedKeyword))
      );
    });
  }, [keyword, selectedCategory]);

  const selectedPlace = useMemo(
    () =>
      filteredPlaces.find(place => place.id === selectedPlaceId) ??
      filteredPlaces[0] ??
      null,
    [filteredPlaces, selectedPlaceId],
  );

  const mapCenter = selectedPlace
    ? { lat: selectedPlace.lat, lng: selectedPlace.lng }
    : { lat: 37.5665, lng: 126.978 };

  const handleSelectPlace = (placeId: number) => {
    setSelectedPlaceId(placeId);
    const place = filteredPlaces.find(item => item.id === placeId);
    if (map && place) {
      map.panTo(new kakao.maps.LatLng(place.lat, place.lng));
    }
  };

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setKeyword(keywordInput);
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
            {category}
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
            <MapMarker position={currentPosition} />
            {filteredPlaces.map(place => (
              <MapMarker
                key={place.id}
                position={{ lat: place.lat, lng: place.lng }}
                onClick={() => handleSelectPlace(place.id)}
              />
            ))}
            {selectedPlace && (
              <CustomOverlayMap
                position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
              >
                <div className={styles.overlayCard}>
                  <strong>{selectedPlace.name}</strong>
                  <span>{selectedPlace.category}</span>
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
          {selectedPlace && (
            <div className={styles.detailCard}>
              <h3>{selectedPlace.name}</h3>
              <p>{selectedPlace.description}</p>
              <div>{selectedPlace.address}</div>
              <div>{selectedPlace.phone}</div>
            </div>
          )}
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
                <div>{place.category}</div>
                <div>{place.address}</div>
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
