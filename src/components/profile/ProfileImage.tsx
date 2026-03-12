import { Camera } from 'lucide-react';
import styles from './profileImage.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  imageUrl?: string;
}

export default function ProfileImage({ imageUrl }: Props) {
  const { t } = useTranslation('common');
  return (
    <div className={styles.profileImageWrapper}>
      <div className={styles.profileImageContainer}>
        <img
          src={imageUrl}
          alt={t('profile')}
          className={styles.profileImage}
        />
      </div>
      <button className={styles.cameraButton}>
        <Camera size={16} />
      </button>
    </div>
  );
}
