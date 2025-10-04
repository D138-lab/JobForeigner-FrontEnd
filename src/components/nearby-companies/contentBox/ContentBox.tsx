import { Dispatch, SetStateAction } from 'react';
import { JobData, ListBox } from '../listBox/ListBox';

import { MapComponent } from '../mapComponent/MapComponent';
import { ResultBox } from '../resultBox/ResultBox';
import styles from './contentBox.module.scss';

export const dummyJobs: JobData[] = [
  {
    companyName: '한빛테크',
    recruitStatus: true,
    companyCategory: 'IT · 소프트웨어',
    address: '서울특별시 강남구 테헤란로 123',
    description: 'AI 기반 소프트웨어 솔루션을 개발하는 스타트업입니다.',
    welfare: ['자유로운 출퇴근', '간식 제공', '재택근무 가능'],
    rating: 4.5,
    isZzimed: true,
  },
  {
    companyName: '에코그린',
    recruitStatus: false,
    companyCategory: '환경 · 에너지',
    address: '부산광역시 해운대구 센텀로 45',
    description: '친환경 에너지 개발 및 태양광 솔루션을 제공하는 기업입니다.',
    welfare: ['연 1회 워크숍', '어학 지원', '자기계발비 지급'],
    rating: 3.8,
    isZzimed: false,
  },
  {
    companyName: '글로벌푸드',
    recruitStatus: true,
    companyCategory: '외식 · 식품',
    address: '대구광역시 수성구 동대구로 77',
    description: '글로벌 프랜차이즈 레스토랑 체인을 운영하는 회사입니다.',
    welfare: ['직원 식사 제공', '명절 보너스', '사내 헬스장'],
    rating: 4.2,
    isZzimed: false,
  },
  {
    companyName: '스마트모빌리티',
    recruitStatus: false,
    companyCategory: '자동차 · 모빌리티',
    address: '인천광역시 연수구 송도동 200',
    description: '전기차 및 자율주행 솔루션을 연구·개발하는 기업입니다.',
    welfare: ['사내 카페', '연차 자유 사용', '사내 교육 프로그램'],
    rating: 4.7,
    isZzimed: true,
  },
  {
    companyName: '하늘병원',
    recruitStatus: true,
    companyCategory: '의료 · 보건',
    address: '광주광역시 동구 금남로 55',
    description: '지역 사회와 함께하는 종합병원으로 의료서비스를 제공합니다.',
    welfare: ['의료비 지원', '기숙사 제공', '교통비 지원'],
    rating: 4.0,
    isZzimed: false,
  },
];

interface Props {
  sortOption: string;
  setSortOption: Dispatch<SetStateAction<string>>;
  boundary: number;
  mode: string;
}

const getLevelByDistance = (distance: number): number => {
  if (distance <= 1) return 5;
  if (distance <= 5) return 6;
  if (distance <= 10) return 7;
  if (distance <= 20) return 8;
  if (distance <= 30) return 9;
  if (distance <= 50) return 10;
  return 11;
};

export const ContentBox = ({
  sortOption,
  setSortOption,
  boundary,
  mode,
}: Props) => {
  return (
    <div className={styles.container}>
      {mode === 'map' ? (
        <>
          <MapComponent level={getLevelByDistance(boundary)} />
          <ResultBox
            sortOption={sortOption}
            setSortOption={setSortOption}
            numOfResult={10}
          />
        </>
      ) : (
        <>
          <div className={styles.listContent}>
            {dummyJobs.map(ele => (
              <ListBox {...ele} />
            ))}
          </div>
          <ResultBox
            sortOption={sortOption}
            setSortOption={setSortOption}
            numOfResult={dummyJobs.length}
          />
        </>
      )}
    </div>
  );
};
