import { PostSortBy } from './PostSortBy';
import { postSortOption } from '@/pages/community/Page';
import styles from './contentArea.module.scss';

interface Props {
  sortOption: postSortOption;
  setSortOption: (option: postSortOption) => void;
}

export const ContentArea = ({ sortOption, setSortOption }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <PostSortBy
          sortOption={sortOption}
          onClick={(option: postSortOption) => setSortOption(option)}
        />
      </div>
      <div className={styles.right}>
        <div>hi</div>
      </div>
    </div>
  );
};
