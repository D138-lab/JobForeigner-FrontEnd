import { DollarSign, MapPin, Star, Timer, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../common/button/Button';
import { formatPublished } from '@/lib/utils/formatPublished';
import {
  getEmploymentTypeLabel,
  getRegionLabel,
  translateJobMetaText,
} from '@/lib/utils/jobMeta';
import styles from './recruitBox.module.scss';
import usePostToggleScarp from '@/lib/apis/mutations/usePostToggleScrap';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export interface RecruitInfoType {
  id: number;
  title: string;
  description: string;
  regionType: string;
  employmentType: string;
  salary: string;
  career: string;
  published: string;
  expiryAt: string;
  grade: string;
  companyName: string;
  imageList: string[];
  isScrapped: boolean;
}

const RecruitBox = ({
  id,
  title,
  regionType,
  employmentType,
  salary,
  career,
  published,
  expiryAt,
  grade,
  companyName,
  isScrapped,
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
          <div className={styles.employmentType}>
            {getEmploymentTypeLabel(employmentType, i18n.language)}
          </div>
        </div>
        <div className={styles.datailInfo}>
          <div className={styles.locationBox}>
            <MapPin size={15} className={styles.icon} />
            <span>{getRegionLabel(regionType, i18n.language)}</span>
          </div>
          <div className={styles.salaryBox}>
            <DollarSign size={15} className={styles.icon} />
            <span>{translateJobMetaText(salary, i18n.language)}</span>
          </div>
          <div>
            <User size={15} className={styles.icon} />
            <span>{translateJobMetaText(career, i18n.language)}</span>
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
