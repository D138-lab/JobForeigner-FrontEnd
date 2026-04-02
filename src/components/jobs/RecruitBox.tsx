import { DollarSign, MapPin, Star, Timer, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../common/button/Button';
import { formatPublished } from '@/lib/utils/formatPublished';
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
  published,
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
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const { mutate, isPending } = usePostToggleScarp();
  void isPending;
  const publishedLabel = formatPublished(published, i18n.language, t);
  const displayRegion = i18n.language.toLowerCase().startsWith('ko')
    ? getRegionLabel(originalRegionType ?? regionType, i18n.language)
    : regionType;
  const displayEmploymentType = i18n.language.toLowerCase().startsWith('ko')
    ? getEmploymentTypeLabel(
        originalEmploymentType ?? employmentType,
        i18n.language,
      )
    : employmentType;

  const handleScrap = () => {
    mutate(id, {
      onSuccess: () => setInnerIsScrapped(prev => !prev),
    });
  };

  const handleApply = () => {
    navigate('/select-resume', { state: { recruitId: id } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.titleBlock}>
          <div className={styles.companyName}>{companyName}</div>
          {isTranslating ? (
            <div className={styles.translationStatus}>번역 중...</div>
          ) : null}
          <div className={styles.title}>{title}</div>
        </div>
        <Star
          style={{ width: 20, height: 20, flexShrink: 0 }}
          className={innerIsScrapped ? styles.scraped : styles.noscraped}
          onClick={handleScrap}
        />
      </div>
      <Link
        to={`/jobs/${id}`}
        className={styles.recruitBar}
        state={{
          id,
          innerIsScrapped,
        }}
      >
        <div className={styles.subRow}>
          <div className={styles.grade}>{grade}</div>
          <div className={styles.employmentType}>{displayEmploymentType}</div>
        </div>
        <div className={styles.datailInfo}>
          <div className={styles.locationBox}>
            <MapPin size={15} className={styles.icon} />
            <span>{displayRegion}</span>
          </div>
          <div className={styles.salaryBox}>
            <DollarSign size={15} className={styles.icon} />
            <span>{salary}</span>
          </div>
          <div>
            <User size={15} className={styles.icon} />
            <span>{career}</span>
          </div>
          <div>
            <Timer size={15} className={styles.icon} />
            <span>
              {`${expiryDate.getFullYear()}.${
                expiryDate.getMonth() + 1
              }.${expiryDate.getDate()}`}{' '}
              , {`D-${dDay}`}
            </span>
          </div>
        </div>
      </Link>
      <div className={styles.btnBox}>
        <div className={styles.published}>{publishedLabel}</div>
        <Button color='#0c4a6e' onClick={handleApply}>
          지원하기
        </Button>
      </div>
    </div>
  );
};

export default RecruitBox;
