import AdvertiseRecruitBox from '@/components/jobs/AdvertiseRecruitBox';
import ApplyTab from '@/components/jobs/ApplyTab';
import DOMPurify from 'dompurify';
import DetailInfoBox from '@/components/jobs/DetailInfoBox';
import styles from './detailPage.module.scss';
import useGetDetailRecruitInfo from '@/lib/apis/queries/useGetDetailRecruitInfo';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const location = useLocation();
  const id = location.state.id;
  const { data, isLoading, isError } = useGetDetailRecruitInfo(id);
  console.log(data);

  if (isLoading) {
    return <div>로딩 중</div>;
  }
  if (isError) {
    return <div>에러 발생</div>;
  }

  return (
    <div className={styles.container}>
      <DetailInfoBox
        {...data!.data}
        expiryAt={data!.data.expiryAt.toLocaleString()}
      />
      <AdvertiseRecruitBox />
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data!.data.description),
        }}
      ></div>
      <ApplyTab
        key={data?.data.id}
        recruitId={data?.data.id!}
        expiryAt={data?.data.expiryAt!}
      />
    </div>
  );
};

export default DetailPage;
