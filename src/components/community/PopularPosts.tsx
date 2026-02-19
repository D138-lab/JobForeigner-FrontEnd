import styles from './popularPosts.module.scss';

interface PopularPostsProps {
  titles: string[];
}

export const PopularPosts = ({ titles }: PopularPostsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <span>실시간 인기 게시글</span>
      </div>
      <div className={styles.posts}>
        {titles.slice(0, 5).map((title, idx) => (
          <div key={idx} className={styles.item}>
            <span>{idx + 1}</span>
            {title}
          </div>
        ))}
      </div>
    </div>
  );
};
