import styles from './relatedPosts.module.scss';

export const RelatedPosts = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>관련 게시글</div>
      <div className={styles.emptyState}>
        아직 관련 게시글이 없습니다.
      </div>
    </div>
  );
};
