import { ApplicationHistoryType } from '@/lib/type/profile/application';
import styles from './profileBottom.module.scss';

interface Props {
  resumes: {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }[];
  applications: ApplicationHistoryType[];
}

export default function ProfileBottom({ resumes, applications }: Props) {
  return (
    <div className={styles.statsGrid}>
      <div>
        <p className={styles.statsItemLabel}>이력서</p>
        <p className={styles.statsItemValue}>{resumes.length}</p>
      </div>
      <div>
        <p className={styles.statsItemLabel}>지원 완료</p>
        <p className={styles.statsItemValue}>{applications.length}</p>
      </div>
      <div>
        <p className={styles.statsItemLabel}>관심 기업</p>
        <p className={styles.statsItemValue}>{resumes.length}</p>
      </div>
    </div>
  );
}
