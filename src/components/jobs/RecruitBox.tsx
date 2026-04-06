import { DollarSign, MapPin, Star, Timer, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../common/button/Button';
import { getEmploymentTypeLabel, getRegionLabel } from '@/lib/utils/jobMeta';
import styles from './recruitBox.module.scss';
import usePostToggleScarp from '@/lib/apis/mutations/usePostToggleScrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface RecruitInfoType {
  id: number;
  title: string;
  description: string;
  regionType: string;
  originalRegionType?: string;
  employmentType: string;
  originalEmploymentType?: string;
  salary: string;
  career: string;
  published: string;
  expiryAt: string;
  grade: string;
  companyName: string;
  imageList: string[];
  isScrapped: boolean;
  isTranslating?: boolean;
}

const RecruitBox = ({
  id,
  title,
  regionType,
  originalRegionType,
  employmentType,
  originalEmploymentType,
  salary,
  career,
  expiryAt,
  grade,
  companyName,
  isScrapped,
  isTranslating = false,
}: RecruitInfoType) => {
  const { t, i18n } = useTranslation('pages');
  const [innerIsScrapped, setInnerIsScrapped] = useState(isScrapped);
  const navigate = useNavigate();
  const expiryDate = new Date(expiryAt);
  const now = Date.now();
  const currentDate = new Date(now);
  const diffTime = expiryDate.getTime() - now;
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const isClosed = expiryDate.getTime() < now;
  const isSameCalendarDay =
    expiryDate.getFullYear() === currentDate.getFullYear() &&
    expiryDate.getMonth() === currentDate.getMonth() &&
    expiryDate.getDate() === currentDate.getDate();
  const { mutate, isPending } = usePostToggleScarp();
  void isPending;
  const displayRegion = getRegionLabel(
    originalRegionType ?? regionType,
    i18n.language,
  );
  const displayEmploymentType = getEmploymentTypeLabel(
    originalEmploymentType ?? employmentType,
    i18n.language,
  );
  const isKorean = i18n.language.toLowerCase().startsWith('ko');
  const deadlineLabel = isClosed
    ? isKorean
      ? '마감됨'
      : 'Closed'
    : isSameCalendarDay
    ? 'D-Day'
    : `D-${dDay}`;
  const formattedExpiryDate = expiryDate.toLocaleDateString(i18n.language, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const deadlineText = isClosed
    ? `${formattedExpiryDate} · ${isKorean ? '마감' : 'Closed'}`
    : `${formattedExpiryDate} · ${deadlineLabel}`;

  const handleScrap = () => {
    mutate(id, {
      onSuccess: () => setInnerIsScrapped(prev => !prev),
    });
  };

  const handleApply = () => {
    navigate('/select-resume', { state: { recruitId: id } });
  };

  return (
    <div className={`${styles.container} ${isClosed ? styles.closedCard : ''}`}>
      <div className={styles.contentRow}>
        <Link
          to={`/jobs/${id}`}
          className={styles.recruitBar}
          state={{
            id,
            innerIsScrapped,
          }}
        >
          <div className={styles.mainColumn}>
            <div className={styles.badgeRow}>
              <div className={styles.companyName}>{companyName}</div>
              <div className={styles.grade}>{grade}</div>
              <div className={styles.employmentType}>{displayEmploymentType}</div>
              {isTranslating ? (
                <div className={styles.translationStatus}>번역 중...</div>
              ) : null}
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.metaRow}>
              <div className={styles.metaItem}>
                <MapPin size={15} className={styles.icon} />
                <span>{displayRegion}</span>
              </div>
              <div className={styles.metaItem}>
                <DollarSign size={15} className={styles.icon} />
                <span>{salary}</span>
              </div>
              <div className={styles.metaItem}>
                <User size={15} className={styles.icon} />
                <span>{career}</span>
              </div>
              <div
                className={`${styles.metaItem} ${
                  isClosed ? styles.closedMetaItem : ''
                }`}
              >
                <Timer size={15} className={styles.icon} />
                <span>{deadlineText}</span>
              </div>
            </div>
          </div>
        </Link>
        <div className={styles.sideColumn}>
          <button
            type='button'
            aria-label={isKorean ? '스크랩' : 'Scrap'}
            className={styles.scrapButton}
            onClick={handleScrap}
          >
            <Star
              style={{ width: 20, height: 20, flexShrink: 0 }}
              className={innerIsScrapped ? styles.scraped : styles.noscraped}
            />
          </button>
          <div
            className={`${styles.deadlineBadge} ${
              isClosed ? styles.closedBadge : styles.openBadge
            }`}
          >
            {deadlineLabel}
          </div>
          <div className={styles.btnBox}>
            <Button
              variant='outline'
              size='medium'
              className={styles.applyButton}
              onClick={handleApply}
              disabled={isClosed}
            >
              {isClosed ? (isKorean ? '지원 마감' : 'Closed') : t('jobs.apply')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecruitBox;
