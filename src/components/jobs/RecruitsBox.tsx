import { GetRecruitsResponse } from '@/lib/apis/queries/useGetRecruits';
import RecruitBox from './RecruitBox';
import styles from './recruitsBox.module.scss';

type Props = {
  data: GetRecruitsResponse;
};

const RecruitsBox = ({ data }: Props) => {
  console.log(data);

  return (
    <div className={styles.container}>
      {data.pageContents.map(recruit => (
        <RecruitBox key={recruit.id} {...recruit} />
      ))}
    </div>
  );
};

export default RecruitsBox;
