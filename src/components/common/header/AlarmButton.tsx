import AlarmModal from './AlarmModal';
import { Bell } from 'lucide-react';
import styles from './alarmButton.module.scss';
import useGetAllNotifications from '@/lib/apis/queries/useGetAllNotifications';
import useGetNotifications from '@/lib/apis/queries/useGetNotifications';
import { useState } from 'react';

type Props = {
  isModalOn: boolean;
  setIsModalOn: (arg: boolean) => void;
};

const AlarmButton = ({ isModalOn, setIsModalOn }: Props) => {
  const { data: numOfNotificatinos, isError, error } = useGetNotifications();
  const { data: notifications } = useGetAllNotifications();
  if (isError) console.log(error);
  return (
    <div className={styles.container}>
      <div
        className={styles.numOfAlarm}
        style={
          !numOfNotificatinos?.data || numOfNotificatinos.data === 0
            ? { display: 'none' }
            : undefined
        }
      >
        {numOfNotificatinos?.data}
      </div>

      <Bell onClick={() => setIsModalOn(!isModalOn)} className={styles.icon} />
      {isModalOn && <AlarmModal data={notifications?.data ?? []} />}
    </div>
  );
};

export default AlarmButton;
