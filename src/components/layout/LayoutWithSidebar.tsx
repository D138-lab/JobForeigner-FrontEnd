import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import RootErrorBoundary from '@/components/error/RootErrorBoundary';
import Sidebar from '../common/sidebar/Sidebar';

import styles from './layoutWithSidebar.module.scss';

interface Props {
  navItems: {
    name: string;
    icon: React.ReactNode;
    items: {
      name: string;
      href: string;
    }[];
  }[];
}

export default function LayoutWithSidebar({ navItems }: Props) {
  return (
    <RootErrorBoundary>
      <div className={styles.shell}>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.sidebar}>
              <Sidebar navigation={navItems} />
            </div>
            <div className={styles.content}>
              <Outlet />
            </div>
          </div>
        </main>
        <Footer />
        <ScrollRestoration />
      </div>
    </RootErrorBoundary>
  );
}
