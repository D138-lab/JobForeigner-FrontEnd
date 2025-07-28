import { JobPostDto } from '@/lib/apis/queries/useGetCompanyApis';
import { RecruitList } from '@/components/companies/RecruitList';
import styles from './recruitInfo.module.scss';
import { useNavigate } from 'react-router-dom';

type Props = {
  data: JobPostDto[];
};

const RecruitInfo = ({ data }: Props) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.recruitInfo}>
        {data.length === 0 ? (
          <div>데이터가 없습니다.</div>
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
