import { ContentBox } from '@/components/nearby-companies/contentBox/ContentBox';
import { ControlBar } from '@/components/nearby-companies/controlBar/ControlBar';
import { TitleBox } from '@/components/nearby-companies/titleBox/TitleBox';
import styles from './page.module.scss';
import { useState } from 'react';

export default function NearbyCompanies() {
  const [region, setRegion] = useState<string>('');
  const [distanceBound, setDistanceBound] = useState<number>(0);
  const [jobType, setJobType] = useState<string>('');
  const [mode, setMode] = useState<string>('map');
  const [onlyOnRecruitMode, setOnlyOnRecruitMode] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<string>('');

  return (
    <div className={styles.container}>
      <TitleBox />
      <ControlBar
        distanceBound={distanceBound}
        jobType={jobType}
        mode={mode}
        onlyOnRecruitMode={onlyOnRecruitMode}
        region={region}
        setDistanceBound={setDistanceBound}
        setJobType={setJobType}
        setMode={setMode}
        setOnlyOnRecruitMode={setOnlyOnRecruitMode}
        setRegion={setRegion}
      />
      <ContentBox
        sortOption={sortOption}
        setSortOption={setSortOption}
        boundary={distanceBound}
      />
    </div>
  );
}
