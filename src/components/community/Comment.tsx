import { CommentContentBox } from './CommentContentBox';
import { CommentDetailProps } from './CommentsArea';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { LikeAndCommentInComment } from './LikeAndCommentInComment';
import styles from './comment.module.scss';

export const Comment = ({
  content,
  country,
  isLikedByMe,
  isVerifiedUser,
  numOfLiked,
  parentId,
  postId,
  postedAt,
  userName,
  userProfileImgUrl,
}: CommentDetailProps) => {
  const isReply = parentId !== null;

  return (
    <div className={`${styles.container} ${isReply ? styles.reply : ''}`}>
      <div className={styles.left}>
        <img
          className={styles.image}
          src={userProfileImgUrl ?? DEFAULT_IMAGE_URL}
          alt='profileImage'
        />
      </div>
      <div className={styles.right}>
        <CommentContentBox
          isVerified={isVerifiedUser}
          userName={userName}
          country={country}
          content={content}
          postedAt={postedAt}
        />
        <LikeAndCommentInComment
          isLikedByMe={isLikedByMe}
          numOfLikes={numOfLiked}
          onClickComment={() => console.log('답글 클릭됨')}
          onClickLike={() => console.log('댓글 좋아요 클릭됨')}
        />
      </div>
    </div>
  );
};
