import { AnnouncementAndEvent } from './AnnouncementAndEvent';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { PopularPosts } from './PopularPosts';
import { PostBox } from './PostBox';
import { SelectPostType } from './SelectPostType';
import { TopMember } from './TopMember';
import { SquarePen } from 'lucide-react';
import { getTranslatedBoardPost } from '@/lib/apis/queries/useGetTranslatedBoardPost';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import useGetBoardPosts from '@/lib/apis/queries/useGetBoardPosts';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { postType } from '@/pages/community/Page';
import { resolveTranslationLanguage } from '@/lib/utils/translation';
import styles from './contentArea.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useQueries } from '@tanstack/react-query';

interface Props {
  postType: postType;
  setPostType: (type: postType) => void;
  searchValue: string;
  onWritePost: () => void;
}

export const ContentArea = ({
  postType,
  setPostType,
  searchValue,
  onWritePost,
}: Props) => {
  const { t, i18n } = useTranslation('common');
  const navigate = useNavigate();
  const { data } = useGetBoardPosts(0, 12);
  const { data: myInfo } = useGetMyInfo();
  const posts = data?.data.pageContents ?? [];
  const currentMemberId = myInfo?.memberId;
  const normalizedSearch = searchValue.trim().toLowerCase();
  const filteredPosts = useMemo(() => {
    let result = posts;

    if (postType !== 'all') {
      const boardCategoryTypeByPostType: Record<
        Exclude<postType, 'all'>,
        string
      > = {
        normal: 'GENERAL',
        used: 'MARKET',
        curation: 'POLICY',
      };

      result = result.filter(
        post =>
          post.boardCategoryType ===
          boardCategoryTypeByPostType[postType as Exclude<postType, 'all'>],
      );
    }

    if (normalizedSearch === '') return result;

    return result.filter(post =>
      post.title.toLowerCase().includes(normalizedSearch),
    );
  }, [postType, posts, normalizedSearch]);

  const hasSearchKeyword = normalizedSearch.length > 0;
  const translationLanguage = resolveTranslationLanguage(i18n.language);
  const translationQueries = useQueries({
    queries: filteredPosts.map(post => ({
      queryKey: [
        'useGetTranslatedBoardPost',
        post.postId,
        translationLanguage ?? '',
      ] as [string, number, string],
      queryFn: getTranslatedBoardPost,
      enabled: !!translationLanguage,
      staleTime: 1000 * 60 * 60 * 24,
    })),
  });
  const translatedPostsMap = useMemo(
    () =>
      new Map(
        filteredPosts.map((post, index) => [
          post.postId,
          translationQueries[index]?.data?.data,
        ]),
      ),
    [filteredPosts, translationQueries],
  );
  const translationPendingMap = useMemo(
    () =>
      new Map(
        filteredPosts.map((post, index) => [
          post.postId,
          !!translationLanguage &&
            !!translationQueries[index] &&
            translationQueries[index].isFetching &&
            !translationQueries[index].data,
        ]),
      ),
    [filteredPosts, translationLanguage, translationQueries],
  );

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

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.headerRow}>
          <SelectPostType postType={postType} onClick={setPostType} />
          <button type='button' className={styles.writeButton} onClick={onWritePost}>
            <SquarePen size={16} />
            {t('communityPage.writePost')}
          </button>
        </div>
        <CustomDivider />
        <div className={styles.posts}>
          {filteredPosts.length === 0 ? (
            <div className={styles.emptyState}>
              {hasSearchKeyword
                ? t('communityPage.emptyBySearch')
                : t('communityPage.emptyByCategory')}
            </div>
          ) : (
            filteredPosts.map(post => (
              (() => {
                const translatedPost = translatedPostsMap.get(post.postId);
                const translatedTitle = translatedPost?.title ?? post.title;
                const isTranslating =
                  translationPendingMap.get(post.postId) ?? false;

                return (
              <PostBox
                key={post.postId}
                id={post.postId}
                memberId={post.memberId}
                currentMemberId={currentMemberId}
                category={post.boardCategoryName}
                content=''
                imageUrl={post.imagePaths?.[0] ?? DEFAULT_IMAGE_URL}
                isVerified={false}
                name={post.memberNickname}
                nationality={
                  countryCodeToName[post.memberCountryCode] ??
                  post.memberCountryCode
                }
                postedAt={new Date(post.createdAt)}
                tags={post.tags}
                title={translatedTitle}
                isLiked={post.likedByMe}
                numOfComment={post.commentCount}
                numOfLike={post.likeCount}
                isTranslating={isTranslating}
                onClick={() =>
                  navigate(`/community/${post.postId}`, {
                    state: { id: post.postId },
                  })
                }
              />
                );
              })()
            ))
          )}
        </div>
      </div>
      <div className={styles.right}>
        <PopularPosts
          posts={filteredPosts.map(post => ({
            id: post.postId,
            title: translatedPostsMap.get(post.postId)?.title ?? post.title,
          }))}
        />
        <TopMember
          people={filteredPosts.slice(0, 3).map(post => ({
            name: post.memberNickname,
            profileImgUrl: post.imagePaths?.[0] ?? DEFAULT_IMAGE_URL,
          }))}
        />
        <AnnouncementAndEvent />
      </div>
    </div>
  );
};
