import styles from './announceBar.module.scss';
import { useTranslation } from 'react-i18next';

export interface AnnounceBarProps {
  type: 'notice' | 'event';
  title: string;
}

export const AnnounceBar = ({ title, type }: AnnounceBarProps) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <div className={`${styles.type} ${styles[type]}`}>
        {t(`communityPage.announceType.${type}`)}
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};
