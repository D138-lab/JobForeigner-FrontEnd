import { CustomDivider } from '../common/customDivider/CustomDivider';
import { EtcDots } from './EtcDots';
import { LikeAndComments } from './LikeAndComments';
import { ProfileInfoInPost } from './ProfileInfoInPost';
import { StyledCategory } from './StyledCategory';
import styles from './detailPostBox.module.scss';

export interface DetailPostBoxProps {
  category: string;
  title: string;
  tags: string[];
  userImgUrl: string;
  userName: string;
  isVerifiedUser: boolean;
  country: string;
  postedAt: Date;
  content: string;
  isLiked: boolean;
  numOfLiked: number;
  numOfComment: number;
}

export const DetailPostBox = ({
  category,
  title,
  tags,
  userImgUrl,
  userName,
  isVerifiedUser,
  country,
  postedAt,
  content,
  isLiked,
  numOfLiked,
  numOfComment,
}: DetailPostBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.topArea}>
        <StyledCategory category={category} />
        <EtcDots postId={2} />
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.tags}>
        {tags.map(tag => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      <ProfileInfoInPost
        imageUrl={userImgUrl}
        isVerified={isVerifiedUser}
        name={userName}
        nationality={country}
        postedAt={postedAt}
      />
      <div className={styles.content}>{content}</div>
      <CustomDivider />
      <LikeAndComments
        isLiked={isLiked}
        onCommentClick={() => console.log('댓글 눌림')}
        onLikeClick={() => console.log('좋아요 눌림')}
        numOfComment={numOfComment}
        numOfLike={numOfLiked}
      />
    </div>
  );
};
