import { JobPostDto } from '@/lib/apis/queries/useGetCompanyApis';
import { RecruitList } from '@/components/companies/RecruitList';
import styles from './recruitInfo.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type Props = {
  data: JobPostDto[];
};

const RecruitInfo = ({ data }: Props) => {
  const { t } = useTranslation('pages');
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.recruitInfo}>
        {data.length === 0 ? (
          <div>{t('companies.recruit.empty')}</div>
        ) : (
          data.map((recruit, index) => (
            <RecruitList
              key={index}
              {...recruit}
              onClick={() =>
                navigate(`/jobs/${recruit.jobPostId}`, {
                  state: { id: recruit.jobPostId },
                })
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default RecruitInfo;
