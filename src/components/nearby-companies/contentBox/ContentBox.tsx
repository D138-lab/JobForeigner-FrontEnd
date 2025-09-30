import { Dispatch, SetStateAction } from 'react';

import { MapComponent } from '../mapComponent/MapComponent';
import { ResultBox } from '../resultBox/ResultBox';
import styles from './contentBox.module.scss';

interface Props {
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
  boundary: number;
}

const getLevelByDistance = (distance: number): number => {
  if (distance <= 1) return 5;
  if (distance <= 5) return 6;
  if (distance <= 10) return 7;
  if (distance <= 20) return 8;
  if (distance <= 30) return 9;
  if (distance <= 50) return 10;
  return 11;
};

export const ContentBox = ({ sortOption, setSortOption, boundary }: Props) => {
  return (
    <div className={styles.container}>
      <MapComponent level={getLevelByDistance(boundary)} />
      <ResultBox
        sortOption={sortOption}
        setSortOption={setSortOption}
        numOfResult={10}
      />
    </div>
  );
};
