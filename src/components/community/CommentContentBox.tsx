import { BadgeCheck } from 'lucide-react';
import { nationalityWithFlagAndKorean } from '@/lib/utils/nationality';
import styles from './commentContentBox.module.scss';
import { timeAgo } from '@/lib/utils/timeago';

interface CommentContentBoxProps {
  userName: string;
  country: string;
  isVerified: boolean;
  postedAt: Date;
  content: string;
  onClickTranslate?: () => void;
  translationLabel?: string;
  showTranslateAction?: boolean;
  hasMenu?: boolean;
}

export const CommentContentBox = ({
  userName,
  country,
  isVerified,
  postedAt,
  content,
  onClickTranslate,
  translationLabel,
  showTranslateAction = false,
  hasMenu = false,
}: CommentContentBoxProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.topArea} ${hasMenu ? styles.withMenu : ''}`}>
        <span className={styles.name}>{userName}</span>
        <span>
          {isVerified ? <BadgeCheck size={14} color='#0081FF' /> : null}
        </span>
        <span className={styles.nationality}>
          {nationalityWithFlagAndKorean(country)}
        </span>
        <span className={styles.postedAt}>{timeAgo(postedAt)}</span>
      </div>
      <div className={styles.content}>{content}</div>
      {showTranslateAction && onClickTranslate && translationLabel ? (
        <button
          type='button'
          className={styles.translateButton}
          onClick={onClickTranslate}
        >
          {translationLabel}
        </button>
      ) : null}
    </div>
  );
};
