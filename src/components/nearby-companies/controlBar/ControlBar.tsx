import { Dispatch, SetStateAction, useState } from 'react';
import {
  selectIndustryOptions,
  selectRegionOptions,
} from '@/components/jobs/DetailSearchForm';

import { ActivateButton } from '@/components/common/activateButton/ActivateButton';
import Select from '@/components/common/select/Select';
import { SelectByTwo } from '@/components/common/selectByTwo/SelectByTwo';
import { Slider } from '@mui/material';
import styles from './controlBar.module.scss';

interface Props {
  region: string;
  setRegion: Dispatch<SetStateAction<string>>;
  distanceBound: number;
  setDistanceBound: Dispatch<SetStateAction<number>>;
  jobType: string;
  setJobType: Dispatch<SetStateAction<string>>;
  mode: string;
  setMode: Dispatch<SetStateAction<string>>;
  onlyOnRecruitMode: boolean;
  setOnlyOnRecruitMode: Dispatch<SetStateAction<boolean>>;
}

export const ControlBar = ({
  distanceBound,
  jobType,
  mode,
  onlyOnRecruitMode,
  region,
  setDistanceBound,
  setJobType,
  setMode,
  setOnlyOnRecruitMode,
  setRegion,
}: Props) => {
  void useState;
  return (
    <div className={styles.container}>
      <div className={styles.topArea}>
        <div className={styles.locationBox}>
          <div>위치</div>
          <Select
            name='region'
            icon='map-pin'
            width='300px'
            options={selectRegionOptions}
            value={region}
            onChange={setRegion}
          />
        </div>
        <div className={styles.distanceBox}>
          <div>거리 반경 : {distanceBound}km</div>
          <Slider
            value={distanceBound}
            onChange={(_, newValue) => setDistanceBound(newValue as number)}
            min={0}
            max={50}
            marks
            step={5}
            shiftStep={5}
            valueLabelDisplay='auto'
            sx={{
              width: 280,
              margin: '0 auto',
              display: 'block',
              color: '#000',
              '& .MuiSlider-thumb': {
                backgroundColor: '#fff',
                border: '2px solid #000',
              },
              '& .MuiSlider-rail': {
                color: '#ccc',
              },
              '& .MuiSlider-mark': {
                backgroundColor: '#000',
              },
              '& .MuiSlider-valueLabel': {
                backgroundColor: '#000',
                color: '#fff',
              },
            }}
          />
        </div>
        <div className={styles.jobTypeBox}>
          <div>업종</div>
          <Select
            name='jobType'
            width='300px'
            options={selectIndustryOptions}
            value={jobType}
            onChange={setJobType}
          />
        </div>
        <div className={styles.selectBox}>
          <SelectByTwo
            firstText='지도'
            secondText='리스트'
            firstIcon='map'
            secondIcon='list'
            selected={mode}
            setSelected={setMode}
          />
        </div>
      </div>
      <div className={styles.bottomArea}>
        <ActivateButton
          text='구인 중만 보기'
          isActive={onlyOnRecruitMode}
          setActive={setOnlyOnRecruitMode}
        />
      </div>
    </div>
  );
};
