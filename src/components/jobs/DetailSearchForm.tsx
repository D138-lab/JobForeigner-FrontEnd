import Select from '../common/select/Select';
import styles from './detailSearchForm.module.scss';

const selectRegionOptions = [
  { value: 'seoul', label: '서울' },
  { value: 'busan', label: '부산' },
  { value: 'daegu', label: '대구' },
  { value: 'incheon', label: '인천' },
  { value: 'gwangju', label: '광주' },
  { value: 'daejeon', label: '대전' },
  { value: 'ulsan', label: '울산' },
  { value: 'sejong', label: '세종' },
  { value: 'gyeonggi', label: '경기' },
  { value: 'gangwon', label: '강원' },
  { value: 'chungbuk', label: '충북' },
  { value: 'chungnam', label: '충남' },
  { value: 'jeonbuk', label: '전북' },
  { value: 'jeonnam', label: '전남' },
  { value: 'gyeongbuk', label: '경북' },
  { value: 'gyeongnam', label: '경남' },
  { value: 'jeju', label: '제주' },
];

const selectJobOptions = [
  { value: 'all', label: '전체' },
  { value: 'developer', label: '개발' },
  { value: 'designer', label: '디자인' },
  { value: 'manager', label: '관리자' },
  { value: 'analyst', label: '분석가' },
  { value: 'consultant', label: '컨설턴트' },
  { value: 'engineer', label: '엔지니어' },
  { value: 'sales', label: '영업' },
  { value: 'marketing', label: '마케팅' },
  { value: 'hr', label: '인사' },
  { value: 'finance', label: '재무' },
  { value: 'legal', label: '법무' },
  { value: 'it', label: 'IT' },
];

export default function DetailSearchForm() {
  return (
    <form className={styles.searchBox}>
      <div className={styles.searchBoxRow}>
        <Select name='region' icon='map-pin' options={selectRegionOptions} />
        <Select name='region' icon='map-pin' options={selectJobOptions} />
        <button type='submit' className={styles.searchButton}>
          검색
        </button>
      </div>
    </form>
  );
}
