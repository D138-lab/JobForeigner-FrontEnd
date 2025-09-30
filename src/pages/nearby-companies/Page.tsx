import { ControlBar } from '@/components/nearby-companies/controlBar/ControlBar';
import { TitleBox } from '@/components/nearby-companies/titleBox/TitleBox';
import styles from './page.module.scss';

export default function NearbyCompanies() {
  return (
    <div className={styles.container}>
      <TitleBox />
      <ControlBar />
    </div>
  );
}
