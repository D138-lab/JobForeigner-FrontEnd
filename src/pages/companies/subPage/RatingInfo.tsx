import { CompanyRatingDto } from '@/lib/apis/mutations/useCompanyApis';
import RadarChartComponent from '@/components/companies/RadarChartComponent';
import RatingInfoBox from '@/components/companies/RatingInfoBox';
import styles from './ratingInfo.module.scss';

export type RatingInfoType = {
  subject: string;
  score: number;
  fullMark: number;
  description: string;
};

const getLevel = (score: number) => {
  if (score >= 4) return '평균 이상';
  if (score < 4 && score >= 3) return '평균';
  if (score < 3) return '평균 이하';
};

const RatingInfo = ({
  averageJobStability,
  averageOrganizationalCulture,
  averageSalarySatisfaction,
  averageWelfare,
  averageWorkLifeBalance,
}: CompanyRatingDto) => {
  const data: RatingInfoType[] = [
    {
      subject: '복지/문화',
      score: averageWelfare,
      fullMark: 5,
      description:
        getLevel(averageWelfare) + ' 수준의 복지와 문화가 제공됩니다.',
    },
    {
      subject: '연봉',
      score: averageSalarySatisfaction,
      fullMark: 5,
      description:
        getLevel(averageSalarySatisfaction) + ' 수준의 연봉이 지급됩니다.',
    },
    {
      subject: '워라벨',
      score: averageWorkLifeBalance,
      fullMark: 5,
      description:
        getLevel(averageWorkLifeBalance) + ' 수준의 워라벨이 유지됩니다.',
    },
    {
      subject: '기업 문화',
      score: averageOrganizationalCulture,
      fullMark: 5,
      description:
        '기업 문화는 ' +
        getLevel(averageOrganizationalCulture) +
        ' 수준으로, 조직 내 협력과 소통이 중요시됩니다.',
    },
    {
      subject: '고용 안정성',
      score: averageJobStability,
      fullMark: 5,
      description:
        '고용 안정성은 ' +
        getLevel(averageJobStability) +
        ' 수준으로, 직원들의 직무 안정성이 보장됩니다.',
    },
  ];
  return (
    <div className={styles.container}>
      <RadarChartComponent data={data} />
      <div className={styles.titleText}>세부 평점 정보</div>
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
