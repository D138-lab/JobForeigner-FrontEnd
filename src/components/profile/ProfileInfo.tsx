import { Mail, MapPin, Phone } from 'lucide-react';
import styles from './profileInfo.module.scss';
import Button from '../common/button/Button';
import { Link } from 'react-router-dom';

interface Props {
  name: string;
  email: string;
  phoneNumber: string;
  region: string;
}

export default function ProfileInfo({
  name,
  email,
  phoneNumber,
  region,
}: Props) {
  return (
    <div className={styles.profileInfo}>
      <div className={styles.profileTopRow}>
        <h2 className={styles.statsItemLabel}>{name}</h2>
        <Link to='/profile/edit'>
          <Button variant='outline' size='medium'>
            프로필 수정
          </Button>
        </Link>
      </div>
      <div className={styles.profileDetails}>
        <div className={styles.profileDetailItem}>
          <Mail className={styles.profileDetailIcon} />
          {email}
        </div>
        <div className={styles.profileDetailItem}>
          <Phone className={styles.profileDetailIcon} />
          {phoneNumber}
        </div>
        <div className={styles.profileDetailItem}>
          <MapPin className={styles.profileDetailIcon} />
          {region}
        </div>
      </div>
    </div>
  );
}
