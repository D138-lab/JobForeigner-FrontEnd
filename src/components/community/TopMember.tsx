import styles from './topMember.module.scss';

interface PersonInfo {
  name: string;
  profileImgUrl: string;
}

interface TopMemberProps {
  people: PersonInfo[];
}

export const TopMember = ({ people }: TopMemberProps) => {
  const topPeople = people.slice(0, 3);

  return (
    <div className={styles.container}>
      <div className={styles.title}>🏆 우수 활동 멤버</div>
      <div className={styles.bar}>
        {topPeople.length === 0 ? (
          <div className={styles.emptyState}>아직 기록된 데이터가 없습니다</div>
        ) : (
          topPeople.map((person, idx) => (
            <div key={idx} className={styles.item}>
              <div className={styles.profile}>
                <img
                  className={styles.profileImg}
                  src={person.profileImgUrl}
                  alt={`${person.name} 프로필 사진`}
                />
                <span className={styles.name}>{person.name}</span>
              </div>
              <span className={styles.rank}>TOP {idx + 1}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
