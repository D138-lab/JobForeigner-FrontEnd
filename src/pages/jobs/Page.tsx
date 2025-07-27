import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import RecruitBox from '@/components/jobs/RecruitsBox';
import styles from './page.module.scss';
import useGetRecruits from '@/lib/apis/queries/useGetRecruits';

const Page = () => {
  const { data, isLoading, isError, error, refetch } = useGetRecruits();

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;
  if (!data?.data.pageContents) return <div>공고가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <DetailSearchForm onClick={refetch} />
      <RecruitBox data={data?.data} />
    </div>
  );
};

export default Page;
