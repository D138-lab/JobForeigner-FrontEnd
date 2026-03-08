import { Bell, Trash } from 'lucide-react';

import { GetAllNotificationsResponse } from '@/lib/apis/queries/useGetAllNotifications';
import styles from './alarmModal.module.scss';
import useDeleteNotifications from '@/lib/apis/mutations/useDeleteNotifications';
import usePostNotifications from '@/lib/apis/mutations/usePostNotifications';
import { useTranslation } from 'react-i18next';

interface Props {
  data: GetAllNotificationsResponse[];
}

const AlarmModal = ({ data }: Props) => {
  const { t } = useTranslation('common');
  const { mutate: readNotification } = usePostNotifications();
  const { mutate: deleteNotification } = useDeleteNotifications();

  return (
    <div className={styles.container}>
      <div className={styles.labelBox}>
        <Bell size={15} />
        <span>{t('notifications')}</span>
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
                {ele.read ? t('read') : t('unread')}
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
          <div className={styles.alarmBox}>{t('noNotifications')}</div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default AlarmModal;
