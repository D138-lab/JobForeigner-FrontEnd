import { History } from 'lucide-react';
import RecentModal from './RecentModal';
import styles from './recentJobs.module.scss';
import useGetRecentJobs from '@/lib/apis/queries/useGetRecentJobs';
import { useState } from 'react';

const RecentJobs = () => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const { data } = useGetRecentJobs();
  return (
    <div className={styles.container}>
      <History onClick={() => setIsModalOn(!isModalOn)} />
      {isModalOn && <RecentModal data={data?.data ?? []} />}
    </div>
  );
};

export default RecentJobs;
