import { BadgeCheck, Clock, TrendingUp } from 'lucide-react';

import { postSortOption } from '@/pages/community/Page';
import styles from './postSortBy.module.scss';

interface Props {
  onClick: (option: postSortOption) => void;
  sortOption: postSortOption;
}

export const PostSortBy = ({ sortOption, onClick }: Props) => {
  return (
    <div className={styles.container}>
      <span
        className={`${styles.btn} ${
          sortOption === 'recent' ? styles.selectedBtn : ''
        }`}
        onClick={() => onClick('recent')}
      >
        <Clock size={18} />
        최신글
      </span>

      <span
        className={`${styles.btn} ${
          sortOption === 'popular' ? styles.selectedBtn : ''
        }`}
        onClick={() => onClick('popular')}
      >
        <TrendingUp size={18} />
        인기글
      </span>

      <span
        className={`${styles.btn} ${
          sortOption === 'verified' ? styles.selectedBtn : ''
        }`}
        onClick={() => onClick('verified')}
      >
        <BadgeCheck size={18} />
        인증회원
      </span>
    </div>
  );
};
