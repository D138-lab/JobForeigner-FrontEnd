import { DollarSign, MapPin, Star, Timer, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../common/button/Button';
import styles from './recruitBox.module.scss';
import usePostToggleScarp from '@/lib/apis/mutations/usePostToggleScrap';
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
  location,
  employmentType,
  salary,
  career,
  published,
  expiryAt,
  grade,
  companyName,
}: RecruitInfoType) => {
  const [isScrapped, setIsScrapped] = useState(false);
  const navigate = useNavigate();
  const expiryDate = new Date(expiryAt);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const { mutate, isPending } = usePostToggleScarp();

  const handleScrap = () => {
    mutate(id, {
      onSuccess: () => setIsScrapped(prev => !prev),
    });
  };

  const handleApply = () => {
    navigate('/select-resume', { state: { recruitId: id } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.title}>{title}</div>
        <Star
          style={{ width: 20, height: 20, flexShrink: 0 }}
          className={isScrapped ? styles.scraped : styles.noscraped}
          onClick={handleScrap}
        />
      </div>
      <Link
        to={`/jobs/${id}`}
        className={styles.recruitBar}
        state={{
          id,
          isScrapped,
        }}
      >
        <div className={styles.subRow}>
          <div>{companyName}</div>
          <div>{grade}</div>
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
              {`${expiryDate.getFullYear()}.${
                expiryDate.getMonth() + 1
              }.${expiryDate.getDate()}`}{' '}
              , {`D-${dDay}`}
            </span>
          </div>
        </div>
      </Link>
      <div className={styles.btnBox}>
        <div className={styles.published}>{published}</div>
        <Button onClick={handleApply}>지원하기</Button>
      </div>
    </div>
  );
};

export default RecruitBox;
