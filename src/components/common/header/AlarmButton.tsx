import AlarmModal from './AlarmModal';
import { Bell } from 'lucide-react';
import styles from './alarmButton.module.scss';
import useGetAllNotifications from '@/lib/apis/queries/useGetAllNotifications';
import useGetNotifications from '@/lib/apis/queries/useGetNotifications';
import { useEffect, useRef, useState } from 'react';

type Props = {
  isModalOn: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const AlarmButton = ({ isModalOn, onToggle, onClose }: Props) => {
  void useState;
  const { data: numOfNotificatinos, isError, error } = useGetNotifications();
  const { data: notifications } = useGetAllNotifications();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isModalOn &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isModalOn, onClose]);

  if (isError) console.log(error);
  return (
    <div ref={wrapperRef} className={styles.container}>
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

      <button
        type='button'
        className={`${styles.trigger} ${isModalOn ? styles.active : ''}`}
        aria-label='Notifications'
        aria-expanded={isModalOn}
        onClick={onToggle}
      >
        <Bell className={styles.icon} size={18} />
      </button>
      {isModalOn && <AlarmModal data={notifications?.data ?? []} />}
    </div>
  );
};

export default AlarmButton;
