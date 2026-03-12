import { GetRecentJobsResponse } from '@/lib/apis/queries/useGetRecentJobs';
import { History } from 'lucide-react';
import styles from './recentModal.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  data: GetRecentJobsResponse[];
};

const RecentModal = ({ data }: Props) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.labelBox}>
        <History size={15} />
        <span>{t('recentJobs')}</span>
      </div>
      <div className={styles.recentList}>
        {data &&
          data.map(ele => (
            <div
              className={styles.recentBox}
              key={ele.jobPostId}
              onClick={() =>
                navigate(`/jobs/${ele.jobPostId}`, {
                  state: { id: ele.jobPostId },
                })
              }
            >
              <div className={styles.title}>{ele.title}</div>
              <div className={styles.subInfos}>
                <div>{ele.companyName}</div>
                <div>{ele.regionType}</div>
              </div>
            </div>
          ))}
        {data.length === 0 ? (
          <div className={styles.emptyState}>{t('noRecentJobs')}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default RecentModal;
