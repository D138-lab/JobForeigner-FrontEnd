import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './applySuccessed.module.scss';
import { CircleCheckBig } from 'lucide-react';

const ApplySuccessed = () => {
  const { t } = useTranslation('pages');

  return (
    <div className={styles.container}>
      <CircleCheckBig className={styles.checkIcon} />
      <div className={styles.textArea}>
        <div>{t('jobsApply.successTitle')}</div>
        <div>{t('jobsApply.successSub')}</div>
      </div>
      <div className={styles.btnBox}>
        <div className={styles.goMainBtn}>
          <Link to='/'>{t('jobsApply.goMain')}</Link>
        </div>
      </div>
    </div>
  );
};

export default ApplySuccessed;
