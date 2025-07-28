import RecentModal from './RecentModal';
import { View } from 'lucide-react';
import styles from './recentJobs.module.scss';
import { useState } from 'react';

const RecentJobs = () => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <View onClick={() => setIsModalOn(!isModalOn)} />
      {isModalOn && <RecentModal />}
    </div>
  );
};

export default RecentJobs;
