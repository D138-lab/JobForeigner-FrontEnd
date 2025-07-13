import { DollarSign, MapPin, Star, StarOff, Timer, User } from 'lucide-react';

import Button from '../common/button/Button';
import { Link } from 'react-router-dom';
import styles from './recruitBox.module.scss';
import { useState } from 'react';

export interface RecruitInfoType {
  id: number;
  title: string;
  description: string;
  location: string;
  employment_type: string;
  salary: string;
  career: string;
  published: string;
  expiryAt: string;
  grade: string;
}

const RecruitBox = ({
  id,
  title,
  description,
  location,
  employment_type,
  salary,
  career,
  published,
  expiryAt,
  grade,
}: RecruitInfoType) => {
  const [isScraped, setIsScraped] = useState(false);
  const handleScrap = () => {
    setIsScraped(!isScraped);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.title}>{title}</div>
        <Star
          className={isScraped ? styles.scraped : styles.noscraped}
          onClick={handleScrap}
        />
      </div>
      <Link
        to={`/jobs/${id}`}
        className={styles.recruitBar}
        state={{
          id,
        }}
      >
        <div className={styles.subRow}>
          <div>기업명</div>
          <div className={styles.employmentType}>{employment_type}</div>
        </div>
        <div className={styles.description}>{description}</div>
        <div className={styles.datailInfo}>
          <div className={styles.locationBox}>
            <MapPin size={15} className={styles.icon} />
            <span>{location}</span>
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
              {expiryAt} , {grade}
            </span>
          </div>
        </div>
      </Link>
      <div className={styles.btnBox}>
        <div className={styles.published}>{published}</div>
        <Button>지원하기</Button>
      </div>
    </div>
  );
};

export default RecruitBox;
