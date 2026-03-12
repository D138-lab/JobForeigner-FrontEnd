import AdvertiseRecruitBox from '@/components/jobs/AdvertiseRecruitBox';
import ApplyTab from '@/components/jobs/ApplyTab';
import DOMPurify from 'dompurify';
import DetailInfoBox from '@/components/jobs/DetailInfoBox';
import styles from './detailPage.module.scss';
import { useEffect } from 'react';
import useGetDetailRecruitInfo from '@/lib/apis/queries/useGetDetailRecruitInfo';
import { useLocation } from 'react-router-dom';
import usePostRecentJobs from '@/lib/apis/mutations/usePostRecentJobs';
import { useTranslation } from 'react-i18next';

const DetailPage = () => {
  const { t } = useTranslation('pages');
  const location = useLocation();
  const id = location.state.id;
  const { data, isLoading, isError } = useGetDetailRecruitInfo(id);
  const { mutate } = usePostRecentJobs();

  useEffect(() => {
    mutate(id);
  }, []);

  if (isLoading) {
    return <div>{t('jobs.loadingShort')}</div>;
  }
  if (isError) {
    return <div>{t('jobs.error')}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageShell}>
        <DetailInfoBox
          {...data!.data}
          expiryAt={data!.data.expiryAt.toLocaleString()}
        />

        <div className={styles.contentGrid}>
          <section className={styles.descriptionSection}>
            <div className={styles.sectionEyebrow}>Job Overview</div>
            <h2 className={styles.sectionTitle}>{data!.data.title}</h2>
            <div
              className={styles.descriptionContent}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data!.data.description),
              }}
            />
          </section>

          <aside className={styles.sideColumn}>
            <AdvertiseRecruitBox />
          </aside>
        </div>

        <ApplyTab
          key={data?.data.id}
          recruitId={data?.data.id!}
          expiryAt={data?.data.expiryAt!}
        />
      </div>
    </div>
  );
};

export default DetailPage;
