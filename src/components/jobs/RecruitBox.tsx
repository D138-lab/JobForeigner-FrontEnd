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
  const [innerIsScrapped, setInnerIsScrapped] = useState(isScrapped);
  const navigate = useNavigate();
  const expiryDate = new Date(expiryAt);
  const today = new Date();
  const diffTime = expiryDate.getTime() - today.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const { mutate, isPending } = usePostToggleScarp();
  void isPending;

  const handleScrap = () => {
    mutate(id, {
      onSuccess: () => setInnerIsScrapped(prev => !prev),
    });
  };

  const handleApply = () => {
    navigate('/select-resume', { state: { recruitId: id } });
  };

  const mappingEmploymentType = (empType: string) => {
    if (empType === 'FULL_TIME') return '정규직';
    if (empType === 'INTERN') return '인턴';
    if (empType === 'CONTRACT') return '계약직';
  };

  const mappingRegion = (region: string): string => {
    const regionMap: Record<string, string> = {
      ALL: '전체',
      SEOUL: '서울',
      BUSAN: '부산',
      DAEGU: '대구',
      INCHEON: '인천',
      GWANGJU: '광주',
      DAEJEON: '대전',
      ULSAN: '울산',
      SEJONG: '세종',
      GYEONGGI: '경기',
      GANGWON: '강원',
      CHUNGBUK: '충북',
      CHUNGNAM: '충남',
      JEONBUK: '전북',
      JEONNAM: '전남',
      GYEONGBUK: '경북',
      GYEONGNAM: '경남',
      JEJU: '제주',
    };

    return regionMap[region.toUpperCase()] ?? region;
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.title}>{title}</div>
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
          <div>{companyName}</div>
          <div>{grade}</div>
          <div className={styles.employmentType}>
            {mappingEmploymentType(employmentType)}
          </div>
        </div>
        <div className={styles.datailInfo}>
          <div className={styles.locationBox}>
            <MapPin size={15} className={styles.icon} />
            <span>{mappingRegion(regionType)}</span>
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
        <Button color='#0c4a6e' onClick={handleApply}>
          지원하기
        </Button>
      </div>
    </div>
  );
};

export default RecruitBox;
