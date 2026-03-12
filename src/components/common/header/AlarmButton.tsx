import AlarmModal from './AlarmModal';
import { Bell } from 'lucide-react';
import styles from './alarmButton.module.scss';
import useGetAllNotifications from '@/lib/apis/queries/useGetAllNotifications';
import useGetNotifications from '@/lib/apis/queries/useGetNotifications';
import { useEffect, useMemo, useRef } from 'react';

type Props = {
  isModalOn: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const AlarmButton = ({ isModalOn, onToggle, onClose }: Props) => {
  const { data: notificationCount } = useGetNotifications();
  const { data: notifications } = useGetAllNotifications();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const unreadCountFromList = useMemo(
    () => (notifications?.data ?? []).filter(notification => !notification.read).length,
    [notifications?.data],
  );
  const unreadCount =
    notifications?.data !== undefined
      ? unreadCountFromList
      : (notificationCount?.data ?? 0);
  const badgeLabel = unreadCount > 9 ? '9+' : String(unreadCount);

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

  return (
    <div ref={wrapperRef} className={styles.container}>
      {unreadCount > 0 && <div className={styles.numOfAlarm}>{badgeLabel}</div>}

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
