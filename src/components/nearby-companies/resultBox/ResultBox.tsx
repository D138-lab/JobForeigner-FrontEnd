import { Dispatch, SetStateAction } from 'react';

import Select from '@/components/common/select/Select';
import styles from './resultBox.module.scss';

export const selectSortOption = [
  { value: 'ALL', label: '전체' },
  { value: 'DISTANCE', label: '거리순' },
];

interface Props {
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
  numOfResult: number;
}

export const ResultBox = ({
  sortOption,
  setSortOption,
  numOfResult,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.resultBox}>
        <div className={styles.label}>검색결과</div>
        <div className={styles.text}>{numOfResult}개 기업 발견</div>
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
    </div>
  );
};
