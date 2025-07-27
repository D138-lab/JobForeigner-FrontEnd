import Input from '../common/input/Input';
import Select from '../common/select/Select';
import styles from './detailSearchForm.module.scss';

const selectRegionOptions = [
  { value: 'all', label: '전체' },
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
  { value: 'FULL_TIME', label: '정규직' },
  { value: 'CONTRACT', label: '계약직' },
  { value: 'INTERN', label: '인턴' },
  { value: 'ETC', label: '기타' },
];

type Props = {
  onClick: (region: string, job: string) => void;
};

export default function DetailSearchForm({ onClick }: Props) {
  return (
    <form className={styles.searchBox}>
      <div className={styles.searchBoxRow}>
        <Input icon='search' placeholder='검색어를 입력하세요.' />
        <Select name='region' icon='map-pin' options={selectRegionOptions} />
        <Select name='job' icon='brief-case' options={selectJobOptions} />
        <button
          type='submit'
          className={styles.searchButton}
          onClick={onClick(selectRegionOptions, selectJobOptions)}
        >
          검색
        </button>
      </div>
    </form>
  );
}
