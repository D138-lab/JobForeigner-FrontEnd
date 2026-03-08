import styles from './popularPosts.module.scss';
import { useNavigate } from 'react-router-dom';

interface PopularPostsProps {
  posts: Array<{
    id: number;
    title: string;
  }>;
}

export const PopularPosts = ({ posts }: PopularPostsProps) => {
  const navigate = useNavigate();
  const topPosts = posts.slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <span>실시간 인기 게시글</span>
      </div>
      <div className={styles.posts}>
        {topPosts.length === 0 ? (
          <div className={styles.emptyState}>아직 기록된 데이터가 없습니다</div>
        ) : (
          topPosts.map((post, idx) => (
            <button
              key={post.id}
              type='button'
              className={styles.item}
              onClick={() =>
                navigate(`/community/${post.id}`, {
                  state: { id: post.id },
                })
              }
            >
              <span>{idx + 1}</span>
              {post.title}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
