import { JobPostDto } from '@/lib/apis/mutations/useCompanyApis';
import { RecruitList } from '@/components/companies/RecruitList';
import styles from './recruitInfo.module.scss';

type Props = {
  data: JobPostDto[];
};

const RecruitInfo = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.recruitInfo}>
        {data.map((recruit, index) => (
          <RecruitList key={index} {...recruit} />
        ))}
      </div>
    </div>
  );
};

export default RecruitInfo;
