import styles from './announceBar.module.scss';

export interface AnnounceBarProps {
  type: 'notice' | 'event';
  title: string;
}

export const AnnounceBar = ({ title, type }: AnnounceBarProps) => {
  return (
    <div className={styles.container}>
      <div className={`${styles.type} ${styles[type]}`}>{type}</div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
