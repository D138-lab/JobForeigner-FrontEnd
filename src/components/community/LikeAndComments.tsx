import { Heart, MessageCircle } from 'lucide-react';

import styles from './likeAndComments.module.scss';

interface LikeAndCommentsProps {
  numOfLike: number;
  numOfComment: number;
  isLiked: boolean;
  onLikeClick: () => void;
  onCommentClick: () => void;
}

export const LikeAndComments = ({
  numOfLike,
  numOfComment,
  isLiked,
  onLikeClick,
  onCommentClick,
}: LikeAndCommentsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconAndText} onClick={onLikeClick}>
        <Heart
          size={20}
          fill={isLiked ? '#FF0000' : '#ffffff'}
          color={isLiked ? '#FF0000' : '#000000'}
        />
        <span>{numOfLike}</span>
      </div>
      <div className={styles.iconAndText} onClick={onCommentClick}>
        <MessageCircle size={20} />
        <span>{numOfComment}</span>
      </div>
    </div>
  );
};
