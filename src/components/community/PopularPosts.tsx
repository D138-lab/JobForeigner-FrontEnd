import styles from './popularPosts.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface PopularPostsProps {
  posts: Array<{
    id: number;
    title: string;
  }>;
}

export const PopularPosts = ({ posts }: PopularPostsProps) => {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const topPosts = posts.slice(0, 5);

  return (
    <div className={styles.container}>
      <div className={styles.titleBox}>
        <span>{t('communityPage.popularPostsTitle')}</span>
      </div>
      <div className={styles.posts}>
        {topPosts.length === 0 ? (
          <div className={styles.emptyState}>{t('communityPage.noData')}</div>
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
