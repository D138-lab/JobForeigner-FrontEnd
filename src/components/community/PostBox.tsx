import { ProfileInfoInPost, ProfileInfoInPostProps } from './ProfileInfoInPost';

import { BriefPost } from './briefPost';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { LikeAndComments } from './LikeAndComments';
import styles from './postBox.module.scss';

export interface PostBoxProps extends ProfileInfoInPostProps {
  category: string;
  tags: string[];
  title: string;
  content: string;
  numOfLike: number;
  numOfComment: number;
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
}: PostBoxProps) => {
  return (
    <div className={styles.container}>
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
