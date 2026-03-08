import { AnnouncementAndEvent } from './AnnouncementAndEvent';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { PopularPosts } from './PopularPosts';
import { PostBox } from './PostBox';
import { SelectPostType } from './SelectPostType';
import { TopMember } from './TopMember';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import useGetBoardPosts from '@/lib/apis/queries/useGetBoardPosts';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { postType } from '@/pages/community/Page';
import styles from './contentArea.module.scss';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  postType: postType;
  setPostType: (type: postType) => void;
  searchValue: string;
}

export const ContentArea = ({ postType, setPostType, searchValue }: Props) => {
  const { t } = useTranslation('common');
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
        <SelectPostType postType={postType} onClick={setPostType} />
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
                title={post.title}
                isLiked={post.likedByMe}
                numOfComment={post.commentCount}
                numOfLike={post.likeCount}
                onClick={() =>
                  navigate(`/community/${post.postId}`, {
                    state: { id: post.postId },
                  })
                }
              />
            ))
          )}
        </div>
      </div>
      <div className={styles.right}>
        <PopularPosts
          posts={filteredPosts.map(post => ({
            id: post.postId,
            title: post.title,
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
