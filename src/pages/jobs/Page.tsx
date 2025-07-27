import DetailSearchForm from '@/components/jobs/DetailSearchForm';
import RecruitBox from '@/components/jobs/RecruitsBox';
import styles from './page.module.scss';
import useGetRecruits from '@/lib/apis/queries/useGetRecruits';
import { useState } from 'react';

const Page = () => {
  const [region, setRegion] = useState('all');
  const [employmentType, setEmploymentType] = useState('all');

  const { data, isLoading, isError, error } = useGetRecruits(
    region,
    employmentType,
  );

  const refetch = (region: string, employmentType: string) => {
    setRegion(region);
    setEmploymentType(employmentType);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생: {error.message}</div>;
  if (!data?.data.pageContents?.length) return <div>공고가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <DetailSearchForm onClick={refetch} />
      <RecruitBox data={data?.data} />
    </div>
  );
};

export default Page;
