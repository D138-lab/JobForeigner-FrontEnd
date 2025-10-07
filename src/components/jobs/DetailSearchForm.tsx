import Input from '../common/input/Input';
import Select from '../common/select/Select';
import styles from './detailSearchForm.module.scss';
import { useState } from 'react';

export const selectRegionOptions = [
  { value: 'ALL', label: '전체' },
  { value: 'SEOUL', label: '서울' },
  { value: 'BUSAN', label: '부산' },
  { value: 'DAEGU', label: '대구' },
  { value: 'INCHEON', label: '인천' },
  { value: 'GWANGJU', label: '광주' },
  { value: 'DAEJEON', label: '대전' },
  { value: 'ULSAN', label: '울산' },
  { value: 'SEJONG', label: '세종' },
  { value: 'GYEONGGI', label: '경기' },
  { value: 'GANGWON', label: '강원' },
  { value: 'CHUNGBUK', label: '충북' },
  { value: 'CHUNGNAM', label: '충남' },
  { value: 'JEONBUK', label: '전북' },
  { value: 'JEONNAM', label: '전남' },
  { value: 'GYEONGBUK', label: '경북' },
  { value: 'GYEONGNAM', label: '경남' },
  { value: 'JEJU', label: '제주' },
];

const selectJobOptions = [
  { value: 'ALL', label: '전체' },
  { value: 'FULL_TIME', label: '정규직' },
  { value: 'CONTRACT', label: '계약직' },
  { value: 'INTERN', label: '인턴' },
  { value: 'ETC', label: '기타' },
];

export const selectIndustryOptions = [
  { value: 'ALL', label: '전체' },
  { value: 'MANUFACTURING', label: '제조업' },
  { value: 'IT', label: 'IT' },
  { value: 'BIOTECH', label: '바이오·헬스' },
  { value: 'FINANCE_INSURANCE', label: '금융·보험' },
  { value: 'CONSTRUCTION_REAL_ESTATE', label: '건설·부동산' },
  { value: 'RETAIL_TRADE', label: '유통·무역' },
  { value: 'EDUCATION_RESEARCH', label: '교육·연구' },
  { value: 'HEALTHCARE_MEDICAL', label: '의료·보건' },
  { value: 'MEDIA_ENTERTAINMENT', label: '미디어·엔터테인먼트' },
  { value: 'SERVICE_INDUSTRY', label: '서비스업' },
  { value: 'ENERGY_ENVIRONMENT', label: '에너지·환경' },
  { value: 'TRANSPORTATION_LOGISTICS', label: '운송·물류' },
  { value: 'AGRICULTURE_FOOD', label: '농업·식품' },
  { value: 'FASHION_BEAUTY', label: '패션·뷰티' },
  { value: 'TELECOM_NETWORK', label: '통신·네트워크' },
  { value: 'AUTOMOTIVE_MOBILITY', label: '자동차·모빌리티' },
  { value: 'GAMING_SOFTWARE', label: '게임·소프트웨어' },
  { value: 'STARTUP', label: '스타트업' },
  { value: 'PUBLIC_SECTOR', label: '공공기관' },
  { value: 'OTHER', label: '기타' },
];

type Props = {
  onClick: (
    searchValue: string,
    region: string,
    employmentType: string,
  ) => void;
  region: string;
  employmentType: string;
  value: string;
  isForCompany: boolean;
};

export default function DetailSearchForm({
  onClick,
  region,
  value,
  employmentType,
  isForCompany,
}: Props) {
  const [innerValue, setInnerValue] = useState<string>(value);
  const [innerRegion, setInnerRegion] = useState<string>(region);
  const [innerEmploymentType, setInnerEmploymentType] =
    useState<string>(employmentType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick(innerValue, innerRegion, innerEmploymentType);
  };

  return (
    <form className={styles.searchBox} onSubmit={handleSubmit}>
      <div className={styles.searchBoxRow}>
        <Input
          value={innerValue}
          icon='search'
          placeholder='기업명을 입력하세요.'
          onChange={e => setInnerValue(e.currentTarget.value)}
        />
        <Select
          name='region'
          icon='map-pin'
          options={selectRegionOptions}
          value={innerRegion}
          onChange={setInnerRegion}
        />
        {!isForCompany ? (
          <Select
            name='job'
            icon='brief-case'
            options={selectJobOptions}
            value={innerEmploymentType}
            onChange={setInnerEmploymentType}
          />
        ) : (
          <Select
            name='job'
            icon='brief-case'
            options={selectIndustryOptions}
            value={innerEmploymentType}
            onChange={setInnerEmploymentType}
          />
        )}

        <button type='submit' className={styles.searchButton}>
          검색
        </button>
      </div>
    </form>
  );
}
