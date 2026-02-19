import styles from './topMember.module.scss';

interface PersonInfo {
  name: string;
  profileImgUrl: string;
}

interface TopMemberProps {
  people: PersonInfo[];
}

export const TopMember = ({ people }: TopMemberProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>🏆 우수 활동 멤버</div>
      <div className={styles.bar}>
        {people.slice(0, 3).map((person, idx) => (
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
        ))}
      </div>
    </div>
  );
};
