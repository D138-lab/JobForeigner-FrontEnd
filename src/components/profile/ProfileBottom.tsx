import { ApplicationHistoryType } from '@/lib/type/profile/application';
import styles from './profileBottom.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  resumes: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }[];
  applications: ApplicationHistoryType[];
}

export default function ProfileBottom({ resumes, applications }: Props) {
  const { t } = useTranslation('pages');
  return (
    <div className={styles.statsGrid}>
      <div>
        <p className={styles.statsItemLabel}>{t('profile.main.myResume')}</p>
        <p className={styles.statsItemValue}>{resumes.length}</p>
      </div>
      <div>
        <p className={styles.statsItemLabel}>
          {t('profile.component.profileBottom.applied')}
        </p>
        <p className={styles.statsItemValue}>{applications.length}</p>
      </div>
      <div>
        <p className={styles.statsItemLabel}>
          {t('profile.component.profileBottom.favoriteCompanies')}
        </p>
        <p className={styles.statsItemValue}>{resumes.length}</p>
      </div>
    </div>
  );
}
