import { CompanyRatingDto } from '@/lib/apis/queries/useGetCompanyApis';
import RadarChartComponent from '@/components/companies/RadarChartComponent';
import RatingInfoBox from '@/components/companies/RatingInfoBox';
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
  averageJobStability,
  averageOrganizationalCulture,
  averageSalarySatisfaction,
  averageWelfare,
  averageWorkLifeBalance,
}: CompanyRatingDto) => {
  const { t } = useTranslation('pages');
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
      <RadarChartComponent data={data} />
      <div className={styles.titleText}>{t('companies.rating.title')}</div>
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
