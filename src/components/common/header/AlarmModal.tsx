import { Bell, Trash } from 'lucide-react';

import { GetAllNotificationsResponse } from '@/lib/apis/queries/useGetAllNotifications';
import styles from './alarmModal.module.scss';
import useDeleteNotifications from '@/lib/apis/mutations/useDeleteNotifications';
import usePostNotifications from '@/lib/apis/mutations/usePostNotifications';

interface Props {
  data: GetAllNotificationsResponse[];
}

const AlarmModal = ({ data }: Props) => {
  const { mutate: readNotification } = usePostNotifications();
  const { mutate: deleteNotification } = useDeleteNotifications();

  return (
    <div className={styles.container}>
      <div className={styles.labelBox}>
        <Bell size={15} />
        <span>알림</span>
      </div>
      <div className={styles.alarmList}>
        {data &&
          data.map(ele => (
            <div className={styles.alarmBox} key={ele.id}>
              <div
                className={styles.textArea}
                onClick={() => readNotification(ele.id)}
              >
                <div className={styles.title}>{ele.title}</div>
                <div className={styles.content}>{ele.content}</div>
              </div>
              <div className={styles.isRead}>
                {ele.read ? '읽음' : '안읽음'}
              </div>
              <Trash
                size={20}
                color='red'
                style={{ margin: 'auto 0' }}
                onClick={() => deleteNotification(ele.id)}
              />
            </div>
          ))}
        {data.length === 0 ? (
          <div className={styles.alarmBox}>알림이 없습니다.</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AlarmModal;
