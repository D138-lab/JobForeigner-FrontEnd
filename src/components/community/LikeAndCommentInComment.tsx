import { Heart, MessageCircle } from 'lucide-react';

import styles from './likeAndCommentInComment.module.scss';

interface LikeAndCommentInCommentProps {
  numOfLikes: number;
  isLikedByMe: boolean;
  onClickLike: () => void;
  onClickComment: () => void;
}

export const LikeAndCommentInComment = ({
  numOfLikes,
  isLikedByMe,
  onClickLike,
  onClickComment,
}: LikeAndCommentInCommentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.likeArea} onClick={onClickLike}>
        <Heart
          size={15}
          color={isLikedByMe ? 'red' : 'black'}
          fill={isLikedByMe ? 'red' : 'white'}
        />
        <span>{numOfLikes}</span>
      </div>
      <div className={styles.commentArea} onClick={onClickComment}>
        <MessageCircle size={15} />
        <span>답글</span>
      </div>
    </div>
  );
};
