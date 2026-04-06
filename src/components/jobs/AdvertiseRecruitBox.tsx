import { ArrowUpRight, BriefcaseBusiness, MapPin, Timer } from 'lucide-react';
import useGetRecommendedJobPosts from '@/lib/apis/queries/useGetRecommendedJobPosts';
import { getEmploymentTypeLabel, getRegionLabel } from '@/lib/utils/jobMeta';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './advertiseRecruitBox.module.scss';

const AdvertiseRecruitBox = () => {
  const { i18n } = useTranslation('pages');
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetRecommendedJobPosts(0, 4);
  const posts = data?.data.pageContents ?? [];
  const displayPosts = posts.map(post => {
    const expiryDate = new Date(post.expiryAt);
    const expiryLabel = Number.isNaN(expiryDate.getTime())
      ? post.expiryAt
      : `${expiryDate.getFullYear()}.${expiryDate.getMonth() + 1}.${expiryDate.getDate()}`;

    return {
      ...post,
      expiryLabel,
    };
  });
  const errorMessage = (
    error as {
      response?: { data?: { message?: string; msg?: string } };
    }
  )?.response?.data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>추천 공고</div>
        <div className={styles.caption}>이력서 기반</div>
      </div>

      {isLoading ? (
        <div className={styles.emptyState}>추천 공고를 불러오는 중입니다.</div>
      ) : isError ? (
        <div className={styles.emptyState}>
          {errorMessage?.message ??
            errorMessage?.msg ??
            '추천 공고를 불러오지 못했습니다.'}
        </div>
      ) : posts.length === 0 ? (
        <div className={styles.emptyState}>추천 공고가 없습니다.</div>
      ) : (
        <div className={styles.list}>
          {displayPosts.map(post => (
            <button
              key={post.id}
              type='button'
              className={styles.card}
              onClick={() =>
                navigate(`/jobs/${post.id}`, {
                  state: { id: post.id, innerIsScrapped: post.isScrapped },
                })
              }
            >
              <div className={styles.cardTop}>
                <div className={styles.company}>{post.companyName}</div>
                <span className={styles.iconBadge}>
                  <ArrowUpRight size={14} />
                </span>
              </div>
              <div className={styles.jobTitle}>{post.title}</div>
              <div className={styles.metaRow}>
                <span>
                  <MapPin size={14} />
                  {getRegionLabel(post.regionType, i18n.language)}
                </span>
                <span>
                  <BriefcaseBusiness size={14} />
                  {getEmploymentTypeLabel(post.employmentType, i18n.language)}
                </span>
                <span>
                  <Timer size={14} />
                  {post.expiryLabel}
                </span>
              </div>
              <div className={styles.bottomRow}>
                <span className={styles.salary}>{post.salary}</span>
                <span className={styles.score}>
                  추천도 {post.recommendationScore.toFixed(1)}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdvertiseRecruitBox;
