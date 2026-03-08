import { AnnounceBar, AnnounceBarProps } from './AnnounceBar';

import styles from './announcementAndEvent.module.scss';
import { useTranslation } from 'react-i18next';

export const AnnouncementAndEvent = () => {
  const { t } = useTranslation('common');

  const announceDummyData: AnnounceBarProps[] = [
    {
      type: 'notice',
      title: t('communityPage.announcements.ruleChange'),
    },
    {
      type: 'event',
      title: t('communityPage.announcements.welcomeEvent'),
    },
    {
      type: 'notice',
      title: t('communityPage.announcements.serverMaintenance'),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('communityPage.announcementTitle')}</div>
      <div className={styles.dataList}>
        {announceDummyData.map((data, idx) => (
          <AnnounceBar key={`${data.type}-${idx}`} {...data} />
        ))}
      </div>
    </div>
  );
};
