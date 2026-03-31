import { ChevronRight } from 'lucide-react';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { nationalityWithFlagAndKorean } from '@/lib/utils/nationality';
import styles from './recommendedPosts.module.scss';
import useGetRecommendedBoardPosts from '@/lib/apis/queries/useGetRecommendedBoardPosts';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface RecommendedPostsProps {
  enabled: boolean;
}

const countryCodeToName: Record<string, string> = {
  KR: 'South Korea',
  VN: 'Vietnam',
  PH: 'Philippines',
  ID: 'Indonesia',
  UZ: 'Uzbekistan',
  TH: 'Thailand',
  NP: 'Nepal',
  KH: 'Cambodia',
  MM: 'Myanmar',
  LK: 'Sri Lanka',
  BD: 'Bangladesh',
  PK: 'Pakistan',
  IN: 'India',
  CN: 'China',
  JP: 'Japan',
  MN: 'Mongolia',
  PE: 'Peru',
  MX: 'Mexico',
};

export const RecommendedPosts = ({ enabled }: RecommendedPostsProps) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('common');
  const { data, isLoading, isError } = useGetRecommendedBoardPosts(
    0,
    4,
    i18n.language,
    enabled,
  );

  if (!enabled) return null;

  const posts = data?.data.pageContents ?? [];

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleBox}>
          <div>
            <h2>{t('communityPage.recommendedPostsTitle')}</h2>
            <p>{t('communityPage.recommendedPostsDescription')}</p>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className={styles.feedback}>{t('communityPage.loadingRecommendations')}</div>
      ) : isError ? (
        <div className={styles.feedback}>{t('communityPage.recommendationsError')}</div>
      ) : posts.length === 0 ? (
        <div className={styles.feedback}>{t('communityPage.noRecommendations')}</div>
      ) : (
        <div className={styles.grid}>
          {posts.map(post => {
            const imageUrl = post.imagePaths?.[0] ?? DEFAULT_IMAGE_URL;
            const nationality =
              countryCodeToName[post.memberCountryCode] ?? post.memberCountryCode;

            return (
              <button
                key={post.postId}
                type='button'
                className={styles.card}
                onClick={() =>
                  navigate(`/community/${post.postId}`, {
                    state: { id: post.postId },
                  })
                }
              >
                <div className={styles.cardTop}>
                  <span className={styles.category}>{post.boardCategoryName}</span>
                  <span className={styles.score}>
                    {t('communityPage.recommendationScore', {
                      score: post.recommendationScore.toFixed(1),
                    })}
                  </span>
                </div>
                <h3>{post.title}</h3>
                <div className={styles.meta}>
                  <img
                    src={imageUrl}
                    alt={t('communityPage.profileImageAlt', {
                      name: post.memberNickname,
                    })}
                    onError={event => {
                      event.currentTarget.src = DEFAULT_IMAGE_URL;
                    }}
                  />
                  <div>
                    <strong>{post.memberNickname}</strong>
                    <span>{nationalityWithFlagAndKorean(nationality)}</span>
                  </div>
                </div>
                <div className={styles.tags}>
                  {post.tags.slice(0, 3).map(tag => (
                    <span key={tag}>#{tag}</span>
                  ))}
                </div>
                <div className={styles.footer}>
                  <span>
                    {t('communityPage.recommendationStats', {
                      likeCount: post.likeCount,
                      commentCount: post.commentCount,
                    })}
                  </span>
                  <ChevronRight size={16} />
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};
