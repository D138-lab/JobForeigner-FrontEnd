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
        <LikeAndComments numOfComment={numOfComment} numOfLike={numOfLike} />
      </div>
    </div>
  );
};
