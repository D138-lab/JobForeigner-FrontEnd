import { GetRecentJobsResponse } from '@/lib/apis/queries/useGetRecentJobs';
import { History } from 'lucide-react';
import styles from './recentModal.module.scss';

type Props = {
  data: GetRecentJobsResponse[];
};

const RecentModal = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.labelBox}>
        <History size={15} />
        <span>최근 본 공고</span>
      </div>
      <div className={styles.recentList}>
        {data &&
          data.map(ele => (
            <div className={styles.recentBox}>{ele.companyName}</div>
          ))}
        {data.length === 0 ? (
          <div className={styles.recentBox}>최근 본 공고가 없습니다.</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RecentModal;
