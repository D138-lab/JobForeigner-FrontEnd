import { Link, NavLink } from 'react-router-dom';

import AlarmButton from './AlarmButton';
import Button from '../button/Button';
import LanguageButton from './LanguageButton';
import { title as Logo } from '@/lib/constants/serviceName';
import RecentJobs from './RecentJobs';
import SearchForm from './SearchForm';
import { headerNavItems } from '@/lib/constants/navItems';
import styles from './header.module.scss';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation('common');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const logout = useAuthStore(state => state.logout);
  const userImgUrl = useAuthStore(state => state.profileImageUrl);
  const [activeModal, setActiveModal] = useState<'recent' | 'alarm' | null>(
    null,
  );

  const handleLogout = () => {
    logout();
    localStorage.removeItem('accessToken');
  };

  const toggleRecentModal = () => {
    setActiveModal(prev => (prev === 'recent' ? null : 'recent'));
  };

  const toggleAlarmModal = () => {
    setActiveModal(prev => (prev === 'alarm' ? null : 'alarm'));
  };

  return (
    <div className={styles.header}>
      <div className={styles.up}>
        <Link className={styles.link} to='/'>
          <img src='public/logo.png' alt='logo' className={styles.logoImg} />
        </Link>
        <SearchForm />
        {!isLoggedIn ? (
          <div className={styles.userBox}>
            <Link to='/login'>
              <Button variant='outline'>{t('login')}</Button>
            </Link>
            <Link to='/register'>
              <Button color='#0c4a6e'>{t('signUp')}</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.topRight}>
            <Link to='/profile' className={styles.profileBox}>
              <img src={userImgUrl} alt='프로필' />
            </Link>
            <Button
              variant='outline'
              onClick={() => handleLogout()}
              color='#0c4a6e'
            >
              {t('로그아웃')}
            </Button>
          </div>
        )}
      </div>
      <div className={styles.down}>
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
        <div className={styles.etcBtns}>
          {isLoggedIn && (
            <>
              <RecentJobs
                isModalOn={activeModal === 'recent'}
                setIsModalOn={() => toggleRecentModal()}
              />
              <AlarmButton
                isModalOn={activeModal === 'alarm'}
                setIsModalOn={() => toggleAlarmModal()}
              />
            </>
          )}
          <LanguageButton />
        </div>
      </div>
    </div>
  );
}
