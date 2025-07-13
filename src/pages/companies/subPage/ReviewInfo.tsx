import RatingInfoBox from '@/components/companies/RatingInfoBox';
import TotalReviewBar from '@/components/companies/TotalReviewBar';
import styles from './reviewInfo.module.scss';

type CompanyReview = {
  reviewer: string;
  totalReview: string;
  description: string;
};

type DetailReview = {
  position: string;
  score: string;
  review: string;
};

const dummyCompanyReviews: CompanyReview[] = [
  {
    reviewer: 'Joon Kim',
    totalReview: '4.8',
    description: '복숭을 좋아하는 사람이라면 무조건 합격 기업',
  },
  {
    reviewer: 'Generic Name',
    totalReview: '4.6',
    description: '이 마음짱임, 강 커서요',
  },
  {
    reviewer: 'Emily Chae',
    totalReview: '4.5',
    description: '복지 최고, 편안한 스몰링',
  },
];

const dummyDetailReviews: DetailReview[] = [
  {
    position: '연봉',
    score: '4.2',
    review:
      '연봉은 업계 평균보다 약간 높은 편입니다.연봉은 업계 평균보다 약간 높은 편입니다.연봉은 업계 평균보다 약간 높은 편입니다.',
  },
  {
    position: '워라벨',
    score: '5.0',
    review:
      '업무 강도는 있지만 자율 근무 제도로 조절이 가능합니다.업무 강도는 있지만 자율 근무 제도로 조절이 가능합니다.업무 강도는 있지만 자율 근무 제도로 조절이 가능합니다.',
  },
  {
    position: '조직문화',
    score: '4.5',
    review:
      '수평적인 조직 문화로 자유로운 의견 교환이 가능합니다.수평적인 조직 문화로 자유로운 의견 교환이 가능합니다.수평적인 조직 문화로 자유로운 의견 교환이 가능합니다.',
  },
  {
    position: '복지',
    score: '3.8',
    review:
      '기본 복지는 잘 갖춰져 있으나 추가 복지는 조금 아쉽습니다.기본 복지는 잘 갖춰져 있으나 추가 복지는 조금 아쉽습니다.기본 복지는 잘 갖춰져 있으나 추가 복지는 조금 아쉽습니다.',
  },
  {
    position: '고용안정성',
    score: '5.0',
    review:
      '장기 근속자가 많고 회사의 재무 구조가 안정적입니다장기 근속자가 많고 회사의 재무 구조가 안정적입니다..장기 근속자가 많고 회사의 재무 구조가 안정적입니다.',
  },
];

const ReviewInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleText}>평균 후기</div>
      <div className={styles.ratingInfoBoxContainer}>
        {dummyDetailReviews.map((detail, idx) => (
          <RatingInfoBox
            key={idx}
            title={detail.position}
            value={detail.score}
          />
        ))}
      </div>

      <div>
        {dummyCompanyReviews.map((ele, idx) => (
          <TotalReviewBar
            key={idx}
            name={ele.reviewer}
            maxScore={'5'}
            score={ele.totalReview}
            description={ele.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ReviewInfo;
