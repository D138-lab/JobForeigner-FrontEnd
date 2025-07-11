import { RecruitList } from '@/components/companies/RecruitList';
import { RecruitListProps } from '@/components/companies/RecruitList';
import styles from './recruitInfo.module.scss';

const dummyRecruitList: RecruitListProps[] = [
  {
    jobPostId: 1,
    title: '프론트엔드 개발자 모집',
    location: '서울',
    employmentType: '정규직',
    career: '신입',
    deadline: new Date('2025-04-30'),
  },
  //   {
  //     empolyeeType: '계약직',
  //     region: '부산',
  //     title: '백엔드 개발자 모집',
  //     teamName: '서버팀',
  //     deadline: '2025-05-15',
  //   },
  //   {
  //     empolyeeType: '인턴',
  //     region: '대구',
  //     title: 'UI/UX 디자이너 인턴 모집',
  //     teamName: '디자인팀',
  //     deadline: '2025-04-15',
  //   },
  //   {
  //     empolyeeType: '프리랜서',
  //     region: '원격',
  //     title: '모바일 앱 개발 프리랜서 모집',
  //     teamName: '모바일팀',
  //     deadline: '2025-05-01',
  //   },
];

const RecruitInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.recruitInfo}>
        {dummyRecruitList.map((recruit, index) => (
          <RecruitList key={index} {...recruit} />
        ))}
      </div>
    </div>
  );
};

export default RecruitInfo;
