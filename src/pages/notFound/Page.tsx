import { ArrowLeft, Home, SearchIcon } from 'lucide-react';
import styles from './page.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@/components/common/button/Button';
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const { t } = useTranslation('pages');
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.iconCircle}>
          <SearchIcon className={styles.searchIcon} />
        </div>
        <div className={styles.errorMessage}>
          <h1 className={styles.errorCode}>404</h1>
          <h2 className={styles.errorTitle}>{t('notFound.title')}</h2>
          <p className={styles.errorDescription}>
            {t('notFound.desc')}
          </p>
        </div>
        <div className={styles.illustration}>
          <svg
            width="240"
            height="160"
            viewBox="0 0 240 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.5 130.5H204.5V138.5C204.5 142.918 200.918 146.5 196.5 146.5H44.5C40.0817 146.5 36.5 142.918 36.5 138.5V130.5Z"
              fill="#E9D5FF"
            />
            <path
              d="M204.5 130.5H36.5V40.5C36.5 36.0817 40.0817 32.5 44.5 32.5H196.5C200.918 32.5 204.5 36.0817 204.5 40.5V130.5Z"
              fill="#F3E8FF"
            />
            <path
              d="M120.5 130.5C142.315 130.5 160 112.815 160 91C160 69.1848 142.315 51.5 120.5 51.5C98.6848 51.5 81 69.1848 81 91C81 112.815 98.6848 130.5 120.5 130.5Z"
              fill="#F5F3FF"
            />
            <path
              d="M120.5 111.5C131.822 111.5 141 102.322 141 91C141 79.6782 131.822 70.5 120.5 70.5C109.178 70.5 100 79.6782 100 91C100 102.322 109.178 111.5 120.5 111.5Z"
              fill="#A855F7"
              fillOpacity="0.2"
            />
            <path
              d="M120.5 91L140.5 71M120.5 91L100.5 71M120.5 91L140.5 111M120.5 91L100.5 111"
              stroke="#A855F7"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className={styles.buttons}>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <span className={styles.iconButton}>
              <ArrowLeft className={styles.icon} />
              {t('notFound.goBack')}
            </span>
          </Button>
          <Link to="/">
            <Button>
              <span className={styles.iconButton}>
                <Home className={styles.icon} />
                {t('notFound.goHome')}
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
