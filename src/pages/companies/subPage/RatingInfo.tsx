import { CompanyRatingDto } from '@/lib/apis/queries/useGetCompanyApis';
import RadarChartComponent from '@/components/companies/RadarChartComponent';
import RatingInfoBox from '@/components/companies/RatingInfoBox';
import { Star } from 'lucide-react';
import styles from './ratingInfo.module.scss';
import { useTranslation } from 'react-i18next';

export type RatingInfoType = {
  subject: string;
  score: number;
  fullMark: number;
  description: string;
};

const getLevel = (score: number, t: (key: string) => string) => {
  if (score >= 4) return t('companies.rating.level.high');
  if (score < 4 && score >= 3) return t('companies.rating.level.mid');
  if (score < 3) return t('companies.rating.level.low');
};

const RatingInfo = ({
  averageRating,
  averageJobStability,
  averageOrganizationalCulture,
  averageSalarySatisfaction,
  totalReviews,
  averageWelfare,
  averageWorkLifeBalance,
}: CompanyRatingDto) => {
  const { t } = useTranslation('pages');
  const overallLevel = getLevel(averageRating, t) ?? '';
  const overallPercentage = Math.max(0, Math.min(100, (averageRating / 5) * 100));
  const data: RatingInfoType[] = [
    {
      subject: t('companies.rating.subjects.welfare'),
      score: averageWelfare,
      fullMark: 5,
      description: t('companies.rating.descriptions.welfare', {
        level: getLevel(averageWelfare, t),
      }),
    },
    {
      subject: t('companies.rating.subjects.salary'),
      score: averageSalarySatisfaction,
      fullMark: 5,
      description: t('companies.rating.descriptions.salary', {
        level: getLevel(averageSalarySatisfaction, t),
      }),
    },
    {
      subject: t('companies.rating.subjects.workLife'),
      score: averageWorkLifeBalance,
      fullMark: 5,
      description: t('companies.rating.descriptions.workLife', {
        level: getLevel(averageWorkLifeBalance, t),
      }),
    },
    {
      subject: t('companies.rating.subjects.culture'),
      score: averageOrganizationalCulture,
      fullMark: 5,
      description: t('companies.rating.descriptions.culture', {
        level: getLevel(averageOrganizationalCulture, t),
      }),
    },
    {
      subject: t('companies.rating.subjects.stability'),
      score: averageJobStability,
      fullMark: 5,
      description: t('companies.rating.descriptions.stability', {
        level: getLevel(averageJobStability, t),
      }),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.summaryGrid}>
        <div className={styles.scoreCard}>
          <div className={styles.scoreLabel}>{t('companies.rating.title')}</div>
          <div className={styles.scoreMain}>
            <div className={styles.scoreValue}>{averageRating.toFixed(1)}</div>
            <div className={styles.scoreScale}>/5</div>
          </div>
          <div className={styles.scoreRow}>
            <Star size={16} fill='currentColor' />
            <span>{overallLevel}</span>
          </div>
          <div className={styles.scoreTrack}>
            <div
              className={styles.scoreFill}
              style={{ width: `${overallPercentage}%` }}
            />
          </div>
          <div className={styles.scoreMeta}>
            <span>{t('companies.detail.tabs.review')}</span>
            <strong>{totalReviews.toLocaleString()}</strong>
          </div>
        </div>
        <RadarChartComponent data={data} />
      </div>
      <div className={styles.ratingInfoBoxContainer}>
        {data.map(ele => (
          <RatingInfoBox
            key={ele.subject}
            title={ele.subject}
            value={ele.score.toString()}
            description={ele.description}
          />
        ))}
      </div>
    </div>
  );
};

export default RatingInfo;
