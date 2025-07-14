import { DollarSign, MapPin, Star, Timer, User } from 'lucide-react';

import Button from '../common/button/Button';
import { Link } from 'react-router-dom';
import styles from './recruitBox.module.scss';
import { useState } from 'react';

export interface RecruitInfoType {
  id: number;
  title: string;
  description: string;
  location: string;
  employmentType: string;
  salary: string;
  career: string;
  published: string;
  expiryAt: string;
  grade: string;
  companyName: string;
}

const RecruitBox = ({
  id,
  title,
  description,
  location,
  employmentType,
  salary,
  career,
  published,
  expiryAt,
  grade,
  companyName,
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
          style={{ width: 20, height: 20, flexShrink: 0 }}
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
          <div>{companyName}</div>
          <div className={styles.employmentType}>{employmentType}</div>
        </div>
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
