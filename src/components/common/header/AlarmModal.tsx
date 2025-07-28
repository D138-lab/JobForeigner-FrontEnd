import { Bell, Trash } from 'lucide-react';

import { GetAllNotificationsResponse } from '@/lib/apis/queries/useGetAllNotifications';
import styles from './alarmModal.module.scss';
import useDeleteNotifications from '@/lib/apis/mutations/useDeleteNotifications';
import usePostNotifications from '@/lib/apis/mutations/usePostNotifications';

interface Props {
  data: GetAllNotificationsResponse[];
}

const AlarmModal = ({ data }: Props) => {
  //   data = [
  //     {
  //       id: 1,
  //       title: '새로운 댓글이 달렸어요',
  //       content: '당신의 게시글에 새로운 댓글이 추가되었습니다.',
  //       read: false,
  //     },
  //     {
  //       id: 2,
  //       title: '지원 결과가 도착했습니다',
  //       content: '회사 A에서 보낸 서류 전형 결과를 확인해보세요.',
  //       read: true,
  //     },
  //     {
  //       id: 3,
  //       title: '관심 공고가 마감 임박이에요',
  //       content: '저장한 채용 공고가 곧 마감됩니다. 확인해보세요.',
  //       read: false,
  //     },
  //     {
  //       id: 4,
  //       title: '기업에서 면접 요청이 왔어요',
  //       content: 'B기업에서 면접 제안을 보냈습니다. 일정 확인 후 회신해주세요.',
  //       read: true,
  //     },
  //     {
  //       id: 5,
  //       title: '오늘의 추천 채용 공고',
  //       content: '당신에게 맞는 새로운 채용 공고가 도착했습니다.',
  //       read: false,
  //     },
  //   ];
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
