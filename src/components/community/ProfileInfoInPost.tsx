import { BadgeCheck } from 'lucide-react';
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
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageUrl ?? ''} alt='profileImage' />
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
