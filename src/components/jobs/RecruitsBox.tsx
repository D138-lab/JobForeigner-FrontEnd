import RecruitBox, { RecruitInfoType } from './RecruitBox';

import styles from './recruitsBox.module.scss';

const recruitDummyData: RecruitInfoType[] = [
  {
    id: 2,
    title: 'Frontend 개발자 (React)',
    description:
      '네이버 쇼핑 프론트엔드 개발을 담당합니다. React.js 및 TypeScript 경험이 필수입니다.',
    location: '서울특별시 강남구',
    employment_type: '정규직',
    salary: '연봉 4500만원 ~ 8000만원',
    career: '경력 1년 이상',
    published: 'SUBMITTED',
    expiryAt: '2025-08-25T23:59:59',
    grade: '사원~대리',
  },
  {
    id: 3,
    title: '백엔드 개발자 (Node.js/NestJS)',
    description:
      '사내 ERP 시스템 백엔드 유지보수 및 신규 개발을 담당합니다. Node.js와 NestJS 프레임워크에 대한 이해가 필요합니다.',
    location: '부산광역시 해운대구',
    employment_type: '정규직',
    salary: '연봉 4000만원 ~ 7000만원',
    career: '경력 3년 이상',
    published: 'SUBMITTED',
    expiryAt: '2025-08-30T23:59:59',
    grade: '대리~과장',
  },
  {
    id: 4,
    title: '데이터 엔지니어 (Python/Spark)',
    description:
      '대용량 로그 데이터를 수집하고 처리하는 데이터 파이프라인 구축 및 운영을 담당합니다.',
    location: '대전광역시 유성구',
    employment_type: '정규직',
    salary: '연봉 5500만원 ~ 9500만원',
    career: '경력 2년 이상',
    published: 'SUBMITTED',
    expiryAt: '2025-09-05T23:59:59',
    grade: '사원~선임',
  },
  {
    id: 5,
    title: '백엔드 개발자 (Go/Kubernetes)',
    description:
      '마이크로서비스 아키텍처 기반 백엔드 시스템 개발 및 클라우드 인프라 운영을 담당합니다.',
    location: '서울특별시 구로구',
    employment_type: '정규직',
    salary: '연봉 6000만원 ~ 10000만원',
    career: '경력 4년 이상',
    published: 'SUBMITTED',
    expiryAt: '2025-08-28T23:59:59',
    grade: '대리~책임',
  },
  {
    id: 6,
    title: 'AI 백엔드 개발자 (Python/FastAPI)',
    description:
      'AI 모델 서빙을 위한 REST API 백엔드 개발을 담당합니다. FastAPI, Python, Docker 경험이 요구됩니다.',
    location: '경기도 수원시 영통구',
    employment_type: '정규직',
    salary: '연봉 5000만원 ~ 8500만원',
    career: '경력 2년 이상',
    published: 'SUBMITTED',
    expiryAt: '2025-09-10T23:59:59',
    grade: '사원~선임',
  },
];

const RecruitsBox = () => {
  return (
    <div className={styles.container}>
      {recruitDummyData.map(recruit => (
        <RecruitBox key={recruit.id} {...recruit} />
      ))}
    </div>
  );
};

export default RecruitsBox;
