import { Link, useLocation } from 'react-router-dom';
import styles from './bookmarkTab.module.scss';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const paths = {
  companies: '/profile/liked-companies',
  jobs: '/profile/scraps',
};

export default function BookmarkTabs() {
  const { t } = useTranslation('pages');
  const { pathname } = useLocation();

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link
          to={paths.companies}
          className={clsx(styles.tab, {
            [styles.active]: pathname === paths.companies,
          })}
        >
          {t('profile.component.bookmarkTabs.companies')}
        </Link>
        <Link
          to={paths.jobs}
          className={clsx(styles.tab, {
            [styles.active]: pathname === paths.jobs,
          })}
        >
          {t('profile.component.bookmarkTabs.jobs')}
        </Link>
      </nav>
    </div>
  );
}
