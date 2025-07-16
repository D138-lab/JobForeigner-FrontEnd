import { ReviewDto } from '@/lib/apis/mutations/useCompanyApis';
import TotalReviewBar from '@/components/companies/TotalReviewBar';
import styles from './reviewInfo.module.scss';

type Props = {
  data: ReviewDto[];
};

const ReviewInfo = ({ data }: Props) => {
  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.titleText}>평균 후기</div>
      <div className={styles.ratingInfoBoxContainer}></div>

      <div>
        {data.map(ele => (
          <TotalReviewBar key={ele.ratingId} {...ele} />
        ))}
      </div>
    </div>
  );
};

export default ReviewInfo;
