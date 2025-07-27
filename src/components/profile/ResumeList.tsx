import { Eye, FileText, PenSquare, Plus, Trash2 } from 'lucide-react';
import styles from './resumeList.module.scss';
import clsx from 'clsx';
import Button from '../common/button/Button';
import { Link } from 'react-router-dom';

interface Props {
  resumes: {
    id: number;
    title: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  }[];
  children: React.ReactNode;
}

export default function ResumeList({ resumes, children }: Props) {
  return (
    <div className={styles.resumeList}>
      <div className={styles.header}>
        <p className={styles.resumeCount}>총 {resumes.length}개의 이력서</p>
        <Link to='/profile/resume/create'>
          <Button>
            <Plus className={styles.buttonIcon} />
            <span className={styles.buttonText}>새 이력서 작성</span>
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
}

ResumeList.items = ({ resumes }: Omit<Props, 'children'>) => {
  const sortedResumes = [...resumes];

  return (
    <div className={styles.resumeItems}>
      {sortedResumes.slice(0, 3).map(resume => (
        <div key={resume.id} className={styles.resumeItem}>
          <div className={styles.resumeInfo}>
            <div className={styles.icon}>
              <FileText />
            </div>
            <div className={styles.text}>
              <h3>{resume.title}</h3>
              <p>최종 수정일: {resume.updatedAt.slice(0, 10)}</p>
            </div>
          </div>
          <div className={styles.actions}>
            <span
              className={clsx(
                styles.status,
                resume.status === '작성완료'
                  ? styles.completed
                  : styles.inProgress,
              )}
            >
              {resume.status}
            </span>
            <div className={styles.iconButtons}>
              <button className={styles.iconButton}>
                <Eye />
              </button>
              <button className={styles.iconButton}>
                <PenSquare />
              </button>
              <button className={styles.iconButton}>
                <Trash2 />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
