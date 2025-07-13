import AdvertiseRecruitBox from '@/components/jobs/AdvertiseRecruitBox';
import ApplyTab from '@/components/jobs/ApplyTab';
import DetailInfoBox from '@/components/jobs/DetailInfoBox';
import RecruitContent from '@/components/jobs/RecruitContent';
import { RecruitInfoType } from '@/components/jobs/RecruitBox';
import styles from './detailPage.module.scss';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const DetailPage = () => {
  const location = useLocation();
  const [data] = useState<RecruitInfoType>(location.state);

  return (
    <div className={styles.container}>
      <DetailInfoBox {...data} />
      <AdvertiseRecruitBox />
      <RecruitContent />
      <ApplyTab key={data.id} recruitId={data.id} />
    </div>
  );
};

export default DetailPage;
