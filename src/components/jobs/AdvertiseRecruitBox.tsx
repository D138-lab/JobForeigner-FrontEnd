import { ArrowUpRight, BriefcaseBusiness, MapPin, Timer } from 'lucide-react';
import useGetRecommendedJobPosts from '@/lib/apis/queries/useGetRecommendedJobPosts';
import { useNavigate } from 'react-router-dom';
import styles from './advertiseRecruitBox.module.scss';

const AdvertiseRecruitBox = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useGetRecommendedJobPosts(0, 4);
  const posts = data?.data.pageContents ?? [];
  const errorMessage = (
    error as {
      response?: { data?: { message?: string; msg?: string } };
    }
  )?.response?.data;

  const mapEmploymentType = (employmentType: string) => {
    if (employmentType === 'FULL_TIME') return '정규직';
    if (employmentType === 'INTERN') return '인턴';
    if (employmentType === 'CONTRACT') return '계약직';
    return employmentType;
  };

  const mapRegion = (region: string) => {
    const regionMap: Record<string, string> = {
      ALL: '전체',
      SEOUL: '서울',
      BUSAN: '부산',
      DAEGU: '대구',
      INCHEON: '인천',
      GWANGJU: '광주',
      DAEJEON: '대전',
      ULSAN: '울산',
      SEJONG: '세종',
      GYEONGGI: '경기',
      GANGWON: '강원',
      CHUNGBUK: '충북',
      CHUNGNAM: '충남',
      JEONBUK: '전북',
      JEONNAM: '전남',
      GYEONGBUK: '경북',
      GYEONGNAM: '경남',
      JEJU: '제주',
    };

    return regionMap[region.toUpperCase()] ?? region;
  };

  const formatExpiry = (expiryAt: string) => {
    const expiryDate = new Date(expiryAt);
    if (Number.isNaN(expiryDate.getTime())) return '';
    return `${expiryDate.getMonth() + 1}.${expiryDate.getDate()} 마감`;
  };

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
          {posts.map(post => (
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
                  {mapRegion(post.regionType)}
                </span>
                <span>
                  <BriefcaseBusiness size={14} />
                  {mapEmploymentType(post.employmentType)}
                </span>
                <span>
                  <Timer size={14} />
                  {formatExpiry(post.expiryAt)}
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
