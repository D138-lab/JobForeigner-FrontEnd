import { Clock, DollarSign, Gift, Shield, Star, Users } from 'lucide-react';

import { ReviewDto } from '@/lib/apis/mutations/useCompanyApis';
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

const TotalReviewBar = (data: ReviewDto) => {
  const meanOfScore = (data: ReviewDto) => {
    let sum =
      data.jobStability +
      data.organizationalCulture +
      data.salarySatisfaction +
      data.workLifeBalance;
    sum /= 5;
    return sum.toPrecision(2);
  };
  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.userInfo}>
          <div className={styles.name}>{data.reviewerName}</div>
          <div className={styles.reviewId}>리뷰ID : {data.ratingId}</div>
        </div>
        <div className={styles.ratingInfo}>
          <div className={styles.scoreRow}>
            <Star size={20} color='yellow' fill='yellow' />
            <div className={styles.score}>{meanOfScore(data)}/5</div>
          </div>
          <div className={styles.scoreLabel}>종합 평점</div>
        </div>
      </div>

      <div className={styles.reviewBox}>
        <div className={styles.specificBar}>
          <div className={styles.titleBox}>
            <Shield size={18} color='green' />
            <div>직업 안정성</div>
          </div>
          <div className={styles.ratingBox}>
            <Star size={18} color='yellow' fill='yellow' />
            <span>{data.jobStability}</span>
          </div>
        </div>
        <div className={styles.comment}>{data.stabilityComment}</div>

        <div className={styles.specificBar}>
          <div className={styles.titleBox}>
            <Users size={18} color='blue' />
            <div>조직 문화</div>
          </div>
          <div className={styles.ratingBox}>
            <Star size={18} color='yellow' fill='yellow' />
            <span>{data.organizationalCulture}</span>
          </div>
        </div>
        <div className={styles.comment}>{data.cultureComment}</div>

        <div className={styles.specificBar}>
          <div className={styles.titleBox}>
            <DollarSign size={18} color='green' />
            <div>급여 만족도</div>
          </div>
          <div className={styles.ratingBox}>
            <Star size={18} color='yellow' fill='yellow' />
            <span>{data.salarySatisfaction}</span>
          </div>
        </div>
        <div className={styles.comment}>{data.salaryComment}</div>

        <div className={styles.specificBar}>
          <div className={styles.titleBox}>
            <Gift size={18} color='purple' />
            <div>복지</div>
          </div>
          <div className={styles.ratingBox}>
            <Star size={18} color='yellow' fill='yellow' />
            <span>{data.welfare}</span>
          </div>
        </div>
        <div className={styles.comment}>{data.welfareComment}</div>

        <div className={styles.specificBar}>
          <div className={styles.titleBox}>
            <Clock size={18} color='orange' />
            <div>워라벨</div>
          </div>
          <div className={styles.ratingBox}>
            <Star size={18} color='yellow' fill='yellow' />
            <span>{data.workLifeBalance}</span>
          </div>
        </div>
        <div className={styles.comment}>{data.workLifeComment}</div>
      </div>
    </div>
  );
};

export default TotalReviewBar;
