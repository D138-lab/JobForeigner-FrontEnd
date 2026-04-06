import { Link, NavLink } from 'react-router-dom';
import styles from './sidebar.module.scss';
import clsx from 'clsx';
import { LogOut, Settings } from 'lucide-react';
import useDeleteSignOut from '@/lib/apis/mutations/useDeleteSignOut';
import { useAuthStore } from '@/lib/stores/useAuthStore';

interface SidebarItemProps {
  icon?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
}

interface SidebarItemSubItemProps {
  name: string;
  href: string;
}

function SidebarItem({ icon, title, children }: SidebarItemProps) {
  return (
    <div className={styles.navItem}>
      <button className={styles.navButton}>
        {icon}
        {title}
      </button>
      {children && <div className={styles.subMenu}>{children}</div>}
    </div>
  );
}

SidebarItem.subItem = ({ name, href }: SidebarItemSubItemProps) => (
  <NavLink
    to={href}
    className={({ isActive }) => {
      return window.location.pathname === href && isActive
        ? clsx(styles.subItem, styles.active)
        : styles.subItem;
    }}
  >
    {name}
  </NavLink>
);

interface SidebarProps {
  navigation: {
    name: string;
    icon: React.ReactNode;
    items: {
      name: string;
      href: string;
    }[];
  }[];
}

export default function Sidebar({ navigation }: SidebarProps) {
  const logout = useAuthStore(state => state.logout);
  const { mutate: signOut } = useDeleteSignOut();

  const handleLogout = () => {
    signOut(undefined, {
      onSettled: () => {
        logout();
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
    });
  };

  return (
    <div className={styles.sidebar}>
      <div>
        <div className={styles.header}>
          <h2>프로필</h2>
        </div>
        <nav className={styles.nav}>
          <div className={styles.subMenu}>
            <SidebarItem.subItem name='프로필 관리' href='/profile' />
          </div>
          {navigation.map(section => (
            <SidebarItem
              key={section.name}
              icon={section.icon}
              title={section.name}
            >
              {section.items.map(item => (
                <SidebarItem.subItem
                  key={item.name}
                  name={item.name}
                  href={item.href}
                />
              ))}
            </SidebarItem>
          ))}
        </nav>
      </div>
      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          <Link to='/profile/settings' className={styles.footerLink}>
            <Settings />
            설정
          </Link>
          <button className={styles.logoutButton} onClick={handleLogout}>
            <LogOut />
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
