import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import RootErrorBoundary from '@/components/error/RootErrorBoundary';
import { QueryClientProvider } from '@/lib/QueryClientProvider';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import styles from './layout.module.scss';

export default function Layout() {
  return (
    <QueryClientProvider>
      <RootErrorBoundary>
        <div className={styles.shell}>
          <Header />
          <main className={styles.content}>
            <Outlet />
          </main>
          <Footer />
          <ScrollRestoration />
        </div>
      </RootErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
