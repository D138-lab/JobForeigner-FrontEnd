import { Bell } from 'lucide-react';
import styles from './alarmButton.module.scss';
import { useState } from 'react';

const AlarmButton = () => {
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  return (
    <div className={styles.container}>
      <div className={styles.numOfAlarm}>2</div>
      <Bell onClick={() => setIsModalOn(!isModalOn)} className={styles.icon} />
      {isModalOn && <div className={styles.modal}>알림들</div>}
    </div>
  );
};

export default AlarmButton;
