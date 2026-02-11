import { Heart, MessageCircle } from 'lucide-react';

import styles from './likeAndComments.module.scss';

interface LikeAndCommentsProps {
  numOfLike: number;
  numOfComment: number;
}

export const LikeAndComments = ({
  numOfLike,
  numOfComment,
}: LikeAndCommentsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.iconAndText}>
        <Heart size={15} />
        <span>{numOfLike}</span>
      </div>
      <div className={styles.iconAndText}>
        <MessageCircle size={15} />
        <span>{numOfComment}</span>
      </div>
    </div>
  );
};
