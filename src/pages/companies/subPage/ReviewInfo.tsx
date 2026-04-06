import { ReviewDto } from '@/lib/apis/queries/useGetCompanyApis';
import TotalReviewBar from '@/components/companies/TotalReviewBar';
import styles from './reviewInfo.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  data: ReviewDto[];
};

const ReviewInfo = ({ data }: Props) => {
  const { t } = useTranslation('pages');

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleText}>{t('companies.review.title')}</div>
        <div className={styles.count}>{data.length}</div>
      </div>
      {data.length === 0 ? (
        <div className={styles.empty}>-</div>
      ) : (
        <div className={styles.reviewList}>
          {data.map(ele => (
            <TotalReviewBar key={ele.ratingId} {...ele} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewInfo;
