import { StyledCategory } from './StyledCategory';
import styles from './briefPost.module.scss';

interface BriefPostProps {
  category: string;
  title: string;
  content: string;
}

export const BriefPost = ({ category, title, content }: BriefPostProps) => {
  return (
    <div className={styles.container}>
      <StyledCategory category={category} />
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};
