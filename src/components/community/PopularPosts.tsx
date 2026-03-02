import styles from './popularPosts.module.scss';

interface PopularPostsProps {
  titles: string[];
}

export const PopularPosts = ({ titles }: PopularPostsProps) => {
  const topTitles = titles.slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <span>실시간 인기 게시글</span>
      </div>
      <div className={styles.posts}>
        {topTitles.length === 0 ? (
          <div className={styles.emptyState}>아직 기록된 데이터가 없습니다</div>
        ) : (
          topTitles.map((title, idx) => (
            <div key={idx} className={styles.item}>
              <span>{idx + 1}</span>
              {title}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
