import { BadgeCheck } from 'lucide-react';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { nationalityWithFlagAndKorean } from '@/lib/utils/nationality';
import styles from './profileInfoInPost.module.scss';
import { timeAgo } from '@/lib/utils/timeago';

export interface ProfileInfoInPostProps {
  imageUrl: string;
  name: string;
  isVerified: boolean;
  postedAt: Date;
  nationality: string;
}

export const ProfileInfoInPost = ({
  imageUrl,
  name,
  isVerified,
  postedAt,
  nationality,
}: ProfileInfoInPostProps) => {
  const resolvedImageUrl =
    typeof imageUrl === 'string' && imageUrl.trim() !== ''
      ? imageUrl
      : DEFAULT_IMAGE_URL;

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={resolvedImageUrl}
        alt='profileImage'
        onError={event => {
          event.currentTarget.src = DEFAULT_IMAGE_URL;
        }}
      />
      <div className={styles.rightBox}>
        <div className={styles.personalInfo}>
          <div className={styles.name}>{name}</div>
          <div>
            {isVerified ? <BadgeCheck size={14} color='#0081FF' /> : null}
          </div>
          <div className={styles.nationality}>
            {nationalityWithFlagAndKorean(nationality)}
          </div>
        </div>
        <div className={styles.postedAt}>{timeAgo(postedAt)}</div>
      </div>
    </div>
  );
};
