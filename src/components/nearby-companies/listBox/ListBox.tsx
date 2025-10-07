import { Star } from 'lucide-react';
import styles from './listbox.module.scss';

export interface JobData {
  companyName: string;
  recruitStatus: boolean;
  companyCategory: string;
  address: string;
  description: string;
  welfare: string[];
  rating: number;
  isZzimed: boolean;
  distance: number;
}

const mappingRecruitStatus = (status: boolean) => {
  if (status === true) return '채용 중';
  else return '채용 마감';
};

export const ListBox = ({
  companyName,
  recruitStatus,
  companyCategory,
  address,
  description,
  welfare,
  rating,
  isZzimed,
  distance,
}: JobData) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.content}>
          <div className={styles.titleArea}>
            <div className={styles.company}>{companyName}</div>
            <div
              className={`${styles.recruitStatus} ${
                recruitStatus === true ? styles.onRecuit : ''
              }`}
            >
              {mappingRecruitStatus(recruitStatus)}
            </div>
          </div>
          <div className={styles.companyCategory}>{companyCategory}</div>
          <div className={styles.address}>{address}</div>
          <div className={styles.description}>{description}</div>
          <div className={styles.welfares}>
            {welfare.map(ele => (
              <div>{ele}</div>
            ))}
          </div>
        </div>
        <div className={styles.ratingAndDistance}>
          <div className={styles.starBox}>
            <Star size={15} fill='gold' color='gold' />
            <span>{rating}</span>
          </div>
          <div className={styles.distance}>{distance.toFixed(1)}km</div>
        </div>
      </div>
      <div className={styles.bottomBar}>bottom bar</div>
    </div>
  );
};
