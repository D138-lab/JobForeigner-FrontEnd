import { Link, NavLink } from 'react-router-dom';

import Button from '../button/Button';
import LanguageButton from './LanguageButton';
import { title as Logo } from '@/lib/constants/serviceName';
import SearchForm from './SearchForm';
import { headerNavItems } from '@/lib/constants/navItems';
import styles from './header.module.scss';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation('common');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout);
  const userImgUrl = useAuthStore(state => state.profileImageUrl);

  const handleLogout = () => {
    logout();
    localStorage.removeItem('accessToken');
  };

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to='/'>{Logo}</Link>
        </div>
        <ul className={styles.nav}>
          {headerNavItems.map(({ id, name, link }) => (
            <li key={id}>
              <NavLink
                to={link}
                className={({ isActive }) => (isActive ? styles.active : '')}
              >
                {t(name)}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.right}>
        <SearchForm />
        <LanguageButton />
        {!isLoggedIn ? (
          <>
            <Link to='/login'>
              <Button variant='outline'>{t('login')}</Button>
            </Link>
            <Link to='/register'>
              <Button>{t('signUp')}</Button>
            </Link>
          </>
        ) : (
          <>
            <Link to='/profile' className={styles.profileBox}>
              <img src={userImgUrl} alt='프로필' />
            </Link>
            <Button variant='outline' onClick={() => handleLogout()}>
              {t('로그아웃')}
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
