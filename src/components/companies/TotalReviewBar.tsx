import ReviewAndCommentBox from './ReviewAndCommentBox';
import { Star } from 'lucide-react';
import styles from './totalReviewBar.module.scss';

type Props = {
  cultureComment: string;
  jobStability: number;
  organizationalCulture: number;
  ratingId: number;
  reviewerName: string;
  salaryComment: string;
  salarySatisfaction: number;
  stabilityComment: string;
  welfare: number;
  welfareComment: string;
  workLifeBalance: number;
  workLifeComment: string;
};

const TotalReviewBar = (data: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.userInfo}>
          <div className={styles.name}>이름</div>
          <div className={styles.reveiwId}>리뷰ID</div>
        </div>
        <div className={styles.ratingInfo}>
          <div className={styles.score}>4.3/5</div>
          <div className={styles.scoreLabel}>종합 평점</div>
        </div>
      </div>

      <ReviewAndCommentBox
        icon='icon'
        title='직업 안정성'
        comment='대기업이라 안정적임'
      />
    </div>
  );
};

export default TotalReviewBar;
