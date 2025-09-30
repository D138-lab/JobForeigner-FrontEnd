import {
  selectIndustryOptions,
  selectRegionOptions,
} from '@/components/jobs/DetailSearchForm';

import { ActivateButton } from '@/components/common/activateButton/ActivateButton';
import Select from '@/components/common/select/Select';
import { SelectByTwo } from '@/components/common/selectByTwo/SelectByTwo';
import { Slider } from '@mui/material';
import styles from './controlBar.module.scss';
import { useState } from 'react';

export const ControlBar = () => {
  const [region, setRegion] = useState<string>('');
  const [distanceBound, setDistanceBound] = useState<number>(0);
  const [jobType, setJobType] = useState<string>('');
  const [mode, setMode] = useState<string>('map');
  const [onlyOnRecruitMode, setOnlyOnRecruitMode] = useState<boolean>(false);

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
