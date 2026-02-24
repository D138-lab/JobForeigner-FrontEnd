import { Dispatch, SetStateAction } from 'react';

import { CompanyBriefBar } from '../companyBriefBar/CompanyBriefBar';
import Select from '@/components/common/select/Select';
import styles from './resultDetailBox.module.scss';

export interface BriefCompanyInfo {
  companyName: string;
  companyType: string;
  rating: number;
  distance: number;
  companyStatus: string;
}

export const selectSortOption = [
  { value: 'ALL', label: '전체' },
  { value: 'DISTANCE', label: '거리순' },
];

interface Props {
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
  numOfResult: number;
  companies: BriefCompanyInfo[];
}

export const ResultDetailBox = ({
  sortOption,
  setSortOption,
  numOfResult,
  companies,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.resultBox}>
        <div className={styles.label}>주변 장소</div>
        <div className={styles.text}>{numOfResult}개</div>
      </div>

      <div className={styles.sortBox}>
        <div className={styles.label}>정렬 기준</div>
        <Select
          name='region'
          width='300px'
          options={selectSortOption}
          value={sortOption}
          onChange={setSortOption}
        />
      </div>
      <div className={styles.companies}>
        {companies.map(ele => (
          <CompanyBriefBar key={ele.companyName} {...ele} />
        ))}
      </div>
    </div>
  );
};
