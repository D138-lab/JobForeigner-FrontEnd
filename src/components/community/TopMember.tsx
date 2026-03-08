import styles from './topMember.module.scss';
import { useTranslation } from 'react-i18next';

interface PersonInfo {
  name: string;
  profileImgUrl: string;
}

interface TopMemberProps {
  people: PersonInfo[];
}

export const TopMember = ({ people }: TopMemberProps) => {
  const { t } = useTranslation('common');
  const topPeople = people.slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('communityPage.topMemberTitle')}</div>
      <div className={styles.bar}>
        {topPeople.length === 0 ? (
          <div className={styles.emptyState}>{t('communityPage.noData')}</div>
        ) : (
          topPeople.map((person, idx) => (
            <div key={idx} className={styles.item}>
              <div className={styles.profile}>
                <img
                  className={styles.profileImg}
                  src={person.profileImgUrl}
                  alt={t('communityPage.profileImageAlt', { name: person.name })}
                />
                <span className={styles.name}>{person.name}</span>
              </div>
              <span className={styles.rank}>
                {t('communityPage.topRank', { rank: idx + 1 })}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
