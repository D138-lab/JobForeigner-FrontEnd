import RecruitBox from './RecruitBox';
import styles from './recruitsBox.module.scss';
import useGetRecruits from '@/lib/apis/queries/useGetRecruits';

const RecruitsBox = () => {
  const { data, isLoading, isError, error } = useGetRecruits();
  console.log(data);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;
  if (!data?.data.pageContents) return <div>공고가 없습니다.</div>;
  return (
    <div className={styles.container}>
      {data.data.pageContents.map(recruit => (
        <RecruitBox key={recruit.id} {...recruit} />
      ))}
    </div>
  );
};

export default RecruitsBox;
