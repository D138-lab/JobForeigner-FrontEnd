import { History } from 'lucide-react';
import RecentModal from './RecentModal';
import styles from './recentJobs.module.scss';
import useGetRecentJobs from '@/lib/apis/queries/useGetRecentJobs';
import { useEffect, useRef } from 'react';

type Props = {
  isModalOn: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const RecentJobs = ({ isModalOn, onToggle, onClose }: Props) => {
  const { data, refetch } = useGetRecentJobs();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isModalOn &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOn, onClose]);

  return (
    <div ref={wrapperRef} className={styles.container}>
      <button
        type='button'
        className={`${styles.trigger} ${isModalOn ? styles.active : ''}`}
        aria-label='Recent jobs'
        aria-expanded={isModalOn}
        onClick={() => {
          if (!isModalOn) refetch();
          onToggle();
        }}
      >
        <History size={18} />
      </button>
      {isModalOn && <RecentModal data={data?.data ?? []} />}
    </div>
  );
};

export default RecentJobs;
