import { Briefcase, Calendar } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { JobPostDto } from '@/lib/apis/queries/useGetCompanyApis';
import styles from './recruitList.module.scss';

interface RecruitListProps extends JobPostDto {
  onClick: () => void;
}

export const RecruitList = ({
  employmentType,
  location,
  title,
  career,
  expiryAt,
  onClick,
}: RecruitListProps) => {
  const { i18n } = useTranslation();
  const deadline = useMemo(() => new Date(expiryAt), [expiryAt]);
  const deadlineText = useMemo(
    () =>
      deadline.toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    [deadline, i18n.language],
  );

  return (
    <button type='button' className={styles.container} onClick={onClick}>
      <div className={styles.topInfo}>
        <div className={styles.empolyeeType}>{employmentType}</div>
        <div className={styles.region}>{location}</div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.bottomInfo}>
        <div className={styles.teamName}>
          <Briefcase width='1rem' />
          <span>{career}</span>
        </div>
        <div className={styles.deadline}>
          <Calendar width='1rem' />
          <span>{deadlineText}</span>
        </div>
      </div>
    </button>
  );
};
