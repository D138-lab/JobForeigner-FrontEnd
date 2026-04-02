import { Clock, DollarSign, Gift, Shield, Star, Users } from 'lucide-react';

import { ReviewDto } from '@/lib/apis/queries/useGetCompanyApis';
import styles from './totalReviewBar.module.scss';
import { useTranslation } from 'react-i18next';

const TotalReviewBar = (data: ReviewDto) => {
  const { t } = useTranslation('pages');
  const meanOfScore = (
    (data.jobStability +
      data.organizationalCulture +
      data.welfare +
      data.salarySatisfaction +
      data.workLifeBalance) /
    5
  ).toFixed(1);
  const reviewMetrics = [
    {
      key: 'jobStability',
      icon: Shield,
      label: t('companies.rating.subjects.stability'),
      score: data.jobStability,
      comment: data.stabilityComment,
    },
    {
      key: 'organizationalCulture',
      icon: Users,
      label: t('companies.rating.subjects.culture'),
      score: data.organizationalCulture,
      comment: data.cultureComment,
    },
    {
      key: 'salarySatisfaction',
      icon: DollarSign,
      label: t('companies.rating.subjects.salary'),
      score: data.salarySatisfaction,
      comment: data.salaryComment,
    },
    {
      key: 'welfare',
      icon: Gift,
      label: t('companies.rating.subjects.welfare'),
      score: data.welfare,
      comment: data.welfareComment,
    },
    {
      key: 'workLifeBalance',
      icon: Clock,
      label: t('companies.rating.subjects.workLife'),
      score: data.workLifeBalance,
      comment: data.workLifeComment,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.userInfo}>
          <div className={styles.name}>{data.reviewerName}</div>
          <div className={styles.reviewId}>#{data.ratingId}</div>
        </div>
        <div className={styles.ratingInfo}>
          <div className={styles.scoreRow}>
            <div className={styles.scoreBadge}>
              <Star size={18} className={styles.starIcon} fill='currentColor' />
              <div className={styles.score}>{meanOfScore}</div>
            </div>
          </div>
          <div className={styles.scoreLabel}>{t('companies.review.title')}</div>
        </div>
      </div>

      <div className={styles.reviewBox}>
        {reviewMetrics.map(metric => {
          const Icon = metric.icon;

          return (
            <div key={metric.key} className={styles.reviewCard}>
              <div className={styles.specificBar}>
                <div className={styles.titleBox}>
                  <span className={styles.metricIconWrap}>
                    <Icon size={16} className={styles.metricIcon} />
                  </span>
                  <div>{metric.label}</div>
                </div>
                <div className={styles.ratingBox}>
                  <Star size={14} className={styles.starIcon} fill='currentColor' />
                  <span>{metric.score.toFixed(1)}</span>
                </div>
              </div>
              <div className={styles.comment}>{metric.comment}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TotalReviewBar;
