import styles from './applyFailed.module.scss';
import { CircleX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ApplyFailed = () => {
  const { t } = useTranslation('pages');

  return (
    <div className={styles.container}>
      <CircleX className={styles.checkIcon} />
      <div className={styles.textArea}>
        <div>{t('jobsApply.failedTitle')}</div>
        <div>{t('jobsApply.failedSub')}</div>
      </div>
      <div className={styles.btnBox}>
        <div className={styles.goMainBtn}>
          <Link to='/'>{t('jobsApply.goMain')}</Link>
        </div>
      </div>
    </div>
  );
};

export default ApplyFailed;
