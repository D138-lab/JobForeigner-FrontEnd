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
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
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

  const handleModals = () => {
    if (isModalOn) setIsModalOn(false);
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
            <RecentJobs
              isModalOn={activeModal === 'recent'}
              setIsModalOn={() => toggleRecentModal()}
            />
            <AlarmButton
              isModalOn={activeModal === 'alarm'}
              setIsModalOn={() => toggleAlarmModal()}
            />
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
