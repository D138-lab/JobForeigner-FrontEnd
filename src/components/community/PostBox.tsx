import { ProfileInfoInPost, ProfileInfoInPostProps } from './ProfileInfoInPost';

import { BriefPost } from './BriefPost';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { LikeAndComments } from './LikeAndComments';
import styles from './postBox.module.scss';

export interface PostBoxProps extends ProfileInfoInPostProps {
  id: number;
  category: string;
  tags: string[];
  title: string;
  content: string;
  numOfLike: number;
  numOfComment: number;
  isLiked: boolean;
  onClick?: () => void;
}

export const PostBox = ({
  category,
  content,
  imageUrl,
  isVerified,
  name,
  nationality,
  postedAt,
  tags,
  title,
  isLiked,
  numOfComment,
  numOfLike,
  onClick,
}: PostBoxProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.topArea}>
        <ProfileInfoInPost
          imageUrl={imageUrl}
          isVerified={isVerified}
          name={name}
          nationality={nationality}
          postedAt={postedAt}
        />
      </div>
      <div className={styles.middleArea}>
        <BriefPost
          category={category}
          title={title}
          content={content}
          tags={tags}
        />
      </div>
      <CustomDivider />
      <div className={styles.bottomArea}>
        <LikeAndComments
          onLikeClick={() => console.log('좋아요 눌림')}
          onCommentClick={() => console.log('댓글 눌림')}
          isLiked={isLiked}
          numOfComment={numOfComment}
          numOfLike={numOfLike}
        />
      </div>
    </div>
  );
};
