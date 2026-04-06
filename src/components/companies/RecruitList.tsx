import { ArrowUpRight, Briefcase, Calendar, MapPin } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { JobPostDto } from '@/lib/apis/queries/useGetCompanyApis';
import { getEmploymentTypeLabel, getRegionLabel } from '@/lib/utils/jobMeta';
import styles from './recruitList.module.scss';

interface RecruitListProps extends JobPostDto {
  onClick: () => void;
}

export const RecruitList = ({
  employmentType,
  location,
  salary,
  title,
  career,
  expiryAt,
  onClick,
}: RecruitListProps) => {
  const { i18n } = useTranslation();
  const isKorean = i18n.language.toLowerCase().startsWith('ko');
  const deadline = useMemo(() => new Date(expiryAt), [expiryAt]);
  const now = Date.now();
  const currentDate = new Date(now);
  const displayEmploymentType = useMemo(
    () => getEmploymentTypeLabel(employmentType, i18n.language),
    [employmentType, i18n.language],
  );
  const displayLocation = useMemo(
    () => getRegionLabel(location, i18n.language),
    [location, i18n.language],
  );
  const deadlineText = useMemo(
    () =>
      deadline.toLocaleDateString(i18n.language, {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    [deadline, i18n.language],
  );
  const dDay = useMemo(() => {
    const diff = deadline.getTime() - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }, [deadline, now]);
  const isClosed = deadline.getTime() < now;
  const isSameCalendarDay =
    deadline.getFullYear() === currentDate.getFullYear() &&
    deadline.getMonth() === currentDate.getMonth() &&
    deadline.getDate() === currentDate.getDate();
  const deadlineBadge =
    isClosed
      ? isKorean
        ? '마감됨'
        : 'Closed'
      : isSameCalendarDay
      ? 'D-Day'
      : `D-${dDay}`;
  const ctaLabel = isKorean ? '공고 보기' : 'View role';
  const metaLabels = isKorean
    ? {
        location: '지역',
        salary: '연봉',
        career: '경력',
        deadline: '마감일',
        salaryFallback: '급여 정보 없음',
        closedNotice: '채용이 마감된 공고입니다',
      }
    : {
        location: 'Location',
        salary: 'Salary',
        career: 'Career',
        deadline: 'Deadline',
        salaryFallback: 'Salary not listed',
        closedNotice: 'This job posting is closed',
      };
  const salaryText = salary?.trim() ? salary : metaLabels.salaryFallback;
  const deadlineMetaText =
    isClosed
      ? `${deadlineText} (${isKorean ? '마감' : 'Closed'})`
      : deadlineText;

  return (
    <button
      type='button'
      className={`${styles.container} ${isClosed ? styles.closedCard : ''}`}
      onClick={onClick}
    >
      <div className={styles.headerRow}>
        <div className={styles.topInfo}>
          <div className={styles.empolyeeType}>{displayEmploymentType}</div>
          <div className={styles.region}>{displayLocation}</div>
        </div>
        <div
          className={`${styles.deadlineBadge} ${
            isClosed ? styles.closed : styles.open
          }`}
        >
          {deadlineBadge}
        </div>
      </div>
      <div className={styles.title}>{title}</div>
      <div className={styles.metaGrid}>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>{metaLabels.location}</div>
          <div className={styles.metaValue}>
            <MapPin width='1rem' />
            <span>{displayLocation}</span>
          </div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>{metaLabels.salary}</div>
          <div className={styles.metaValue}>
            <span>{salaryText}</span>
          </div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>{metaLabels.career}</div>
          <div className={styles.metaValue}>
            <Briefcase width='1rem' />
            <span>{career}</span>
          </div>
        </div>
        <div className={styles.metaItem}>
          <div className={styles.metaLabel}>{metaLabels.deadline}</div>
          <div
            className={`${styles.metaValue} ${isClosed ? styles.closedMetaValue : ''}`}
          >
            <Calendar width='1rem' />
            <span>{deadlineMetaText}</span>
          </div>
        </div>
      </div>
      {isClosed ? <div className={styles.closedNotice}>{metaLabels.closedNotice}</div> : null}
      <div className={styles.bottomInfo}>
        <div className={styles.cta}>
          <span>{ctaLabel}</span>
          <ArrowUpRight width='1rem' />
        </div>
      </div>
    </button>
  );
};
