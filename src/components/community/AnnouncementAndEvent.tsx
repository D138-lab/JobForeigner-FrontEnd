import { AnnounceBar, AnnounceBarProps } from './AnnounceBar';

import styles from './announcementAndEvent.module.scss';

export const announceDummyData: AnnounceBarProps[] = [
  {
    type: 'notice',
    title: '커뮤니티 이용 규칙이 일부 개정되었습니다. 반드시 확인해주세요.',
  },
  {
    type: 'event',
    title: '신규 가입자 대상 환영 이벤트 진행 중! 참여하고 상품 받아가세요.',
  },
  {
    type: 'notice',
    title: '서버 점검 안내: 7월 20일 02:00 ~ 04:00 서비스 이용이 제한됩니다.',
  },
];

export const AnnouncementAndEvent = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>공지사항 & 이벤트</div>
      <div className={styles.dataList}>
        {announceDummyData.map(data => (
          <AnnounceBar {...data} />
        ))}
      </div>
    </div>
  );
};
