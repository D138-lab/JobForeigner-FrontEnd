import { StyledCategory } from './StyledCategory';
import { timeAgo } from '@/lib/utils/timeago';
import { ArrowUpRight, MessageCircle, ThumbsUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { RelatedBoardPostSummary } from '@/lib/apis/queries/useGetRelatedBoardPosts';
import styles from './relatedPosts.module.scss';

interface RelatedPostsProps {
  posts: RelatedBoardPostSummary[];
  isPending?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

export const RelatedPosts = ({
  posts,
  isPending = false,
  isError = false,
  errorMessage,
}: RelatedPostsProps) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.title}>관련 게시글</div>
      {isPending ? (
        <div className={styles.emptyState}>관련 게시글을 불러오는 중입니다.</div>
      ) : isError ? (
        <div className={styles.emptyState}>
          {errorMessage ?? '관련 게시글을 불러오지 못했습니다.'}
        </div>
      ) : posts.length === 0 ? (
        <div className={styles.emptyState}>아직 관련 게시글이 없습니다.</div>
      ) : (
        <div className={styles.list}>
          {posts.map(post => (
            <button
              key={post.postId}
              type='button'
              className={styles.postCard}
              onClick={() =>
                navigate(`/community/${post.postId}`, {
                  state: { id: post.postId },
                })
              }
            >
              <div className={styles.topRow}>
                <StyledCategory category={post.boardCategoryName} />
                <span className={styles.arrow}>
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div className={styles.postTitle}>{post.title}</div>
              <div className={styles.meta}>
                <span>{post.memberNickname}</span>
                <span className={styles.dot} />
                <span>{timeAgo(post.createdAt)}</span>
              </div>
              {post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
              )}
              <div className={styles.stats}>
                <span>
                  <ThumbsUp size={14} />
                  {post.likeCount}
                </span>
                <span>
                  <MessageCircle size={14} />
                  {post.commentCount}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
