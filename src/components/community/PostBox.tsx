import { ProfileInfoInPost, ProfileInfoInPostProps } from './ProfileInfoInPost';

import { BriefPost } from './briefPost';
import styles from './postBox.module.scss';

export interface PostBoxProps extends ProfileInfoInPostProps {
  category: string;
  tags: string[];
  title: string;
  content: string;
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
        <BriefPost category={category} title={title} content={content} />
      </div>
      <div className={styles.bottomArea}>bottom</div>
    </div>
  );
};
