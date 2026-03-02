import { AnnouncementAndEvent } from './AnnouncementAndEvent';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { PopularPosts } from './PopularPosts';
import { PostBox } from './PostBox';
import { PostSortBy } from './PostSortBy';
import { SelectPostType } from './SelectPostType';
import { TopMember } from './TopMember';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import useGetBoardPosts from '@/lib/apis/queries/useGetBoardPosts';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { postSortOption } from '@/pages/community/Page';
import styles from './contentArea.module.scss';
import { useNavigate } from 'react-router-dom';

interface Props {
  sortOption: postSortOption;
  setSortOption: (option: postSortOption) => void;
  postType: string;
  setPostType: (type: string) => void;
}

export const ContentArea = ({
  sortOption,
  setSortOption,
  postType,
  setPostType,
}: Props) => {
  const navigate = useNavigate();
  const { data } = useGetBoardPosts(0, 12);
  const { data: myInfo } = useGetMyInfo();
  const posts = data?.data.pageContents ?? [];
  const currentMemberId = myInfo?.memberId;

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
        <PostSortBy
          sortOption={sortOption}
          onClick={(option: postSortOption) => setSortOption(option)}
        />
        <CustomDivider />
        <SelectPostType postType={postType} onClick={setPostType} />
        <div className={styles.posts}>
          {posts.length === 0 ? (
            <div className={styles.emptyState}>
              해당 카테고리에 게시글이 없습니다.
            </div>
          ) : (
            posts.map(post => (
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
        <PopularPosts titles={posts.map(post => post.title)} />
        <TopMember
          people={posts.slice(0, 3).map(post => ({
            name: post.memberNickname,
            profileImgUrl: post.imagePaths?.[0] ?? DEFAULT_IMAGE_URL,
          }))}
        />
        <AnnouncementAndEvent />
      </div>
    </div>
  );
};
