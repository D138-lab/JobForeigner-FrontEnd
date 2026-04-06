import AdvertiseRecruitBox from '@/components/jobs/AdvertiseRecruitBox';
import ApplyTab from '@/components/jobs/ApplyTab';
import DOMPurify from 'dompurify';
import DetailInfoBox from '@/components/jobs/DetailInfoBox';
import useGetTranslatedJobPost from '@/lib/apis/queries/useGetTranslatedJobPost';
import { resolveTranslationLanguage } from '@/lib/utils/translation';
import styles from './detailPage.module.scss';
import { useEffect } from 'react';
import useGetDetailRecruitInfo from '@/lib/apis/queries/useGetDetailRecruitInfo';
import { useLocation } from 'react-router-dom';
import usePostRecentJobs from '@/lib/apis/mutations/usePostRecentJobs';
import { useTranslation } from 'react-i18next';

const DetailPage = () => {
  const { t, i18n } = useTranslation('pages');
  const location = useLocation();
  const id = location.state.id;
  const { data, isLoading, isError } = useGetDetailRecruitInfo(id);
  const translationLanguage = resolveTranslationLanguage(i18n.language);
  const { data: translatedData } = useGetTranslatedJobPost(
    id,
    translationLanguage,
    !!translationLanguage,
  );
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

  const recruitData = translatedData?.data ?? data!.data;

  return (
    <div className={styles.container}>
      <div className={styles.pageShell}>
        <DetailInfoBox
          {...recruitData}
          originalRegionType={data?.data.regionType}
          originalEmploymentType={data?.data.employmentType}
          expiryAt={recruitData.expiryAt.toLocaleString()}
        />

        <div className={styles.contentGrid}>
          <section className={styles.descriptionSection}>
            <div className={styles.sectionEyebrow}>Job Overview</div>
            <h2 className={styles.sectionTitle}>{recruitData.title}</h2>
            <div
              className={styles.descriptionContent}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(recruitData.description),
              }}
            />
          </section>

          <aside className={styles.sideColumn}>
            <AdvertiseRecruitBox />
          </aside>
        </div>

        <ApplyTab
          key={recruitData.id}
          recruitId={recruitData.id}
          expiryAt={recruitData.expiryAt}
        />
      </div>
    </div>
  );
};

export default DetailPage;
