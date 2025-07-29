import { History } from 'lucide-react';
import RecentModal from './RecentModal';
import styles from './recentJobs.module.scss';
import useGetRecentJobs from '@/lib/apis/queries/useGetRecentJobs';
import { useState } from 'react';

type Props = {
  isModalOn: boolean;
  setIsModalOn: (arg: boolean) => void;
};

const RecentJobs = ({ isModalOn, setIsModalOn }: Props) => {
  const { data } = useGetRecentJobs();
  return (
    <div className={styles.container}>
      <History
        onClick={() => {
          // onClick();
          setIsModalOn(!isModalOn);
        }}
      />
      {isModalOn && <RecentModal data={data?.data ?? []} />}
    </div>
  );
};

export default RecentJobs;
