import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ArrowLeft } from 'lucide-react';
import { CommentArea } from '@/components/community/CommentsArea';
import { CommentDetailProps } from '@/components/community/CommentsArea';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { DetailPostBox } from '@/components/community/DetailPostBox';
import { RelatedPosts } from '@/components/community/RelatedPosts';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import useGetBoardPostDetail from '@/lib/apis/queries/useGetBoardPostDetail';
import useGetBoardPostComments from '@/lib/apis/queries/useGetBoardPostComments';
import styles from './detailPage.module.scss';
import { useAuthStore } from '@/lib/stores/useAuthStore';

export default function DetailPage() {
  const params = useParams();
  const location = useLocation();
  const fallbackPostId = location.state?.id;
  const postId = Number(params.id ?? fallbackPostId ?? 0);
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useGetBoardPostDetail(
    postId,
    Number.isFinite(postId) && postId > 0,
  );
  const { data: commentsData } = useGetBoardPostComments(
    postId,
    0,
    12,
    [],
    Number.isFinite(postId) && postId > 0,
  );
  const { data: myInfo } = useGetMyInfo();

  const userImgUrl = useAuthStore(state => state.profileImageUrl);
  const post = data?.data;
  const isMine = !!post && !!myInfo?.memberId && post.memberId === myInfo.memberId;

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

  const errorMessage = (
    error as {
      response?: { data?: { message?: string; msg?: string } };
    }
  )?.response?.data;
  const comments = (commentsData?.data.pageContents ?? []).map(
    comment =>
      ({
        id: comment.commentId,
        memberId: comment.memberId,
        postId: comment.postId,
        parentId: comment.parentId ?? null,
        userName: comment.memberNickname,
        country:
          countryCodeToName[comment.memberCountryCode] ??
          comment.memberCountryCode,
        isVerifiedUser: false,
        userProfileImgUrl: DEFAULT_IMAGE_URL,
        postedAt: new Date(comment.createdAt),
        content: comment.content,
        numOfLiked: comment.likeCount,
        isLikedByMe: comment.likedByMe,
      }) as CommentDetailProps,
  );
  const totalComments = commentsData?.data.totalElements ?? comments.length;

  return (
    <div className={styles.container}>
      <div className={styles.goBack} onClick={() => navigate(-1)}>
        <ArrowLeft size={20} />
        <span>커뮤니티로 돌아가기</span>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.mainContent}>
          {isPending && <div>게시글 정보를 불러오는 중입니다.</div>}
          {isError && (
            <div>
              {errorMessage?.message ??
                errorMessage?.msg ??
                '게시글을 불러오지 못했습니다.'}
            </div>
          )}
          {!isPending && !isError && post && (
            <DetailPostBox
              postId={post.postId}
              isMine={isMine}
              onDeleted={() => navigate('/community')}
              isLiked={post.likedByMe}
              category={post.boardCategoryName}
              content={post.content}
              country={
                countryCodeToName[post.memberCountryCode] ??
                post.memberCountryCode
              }
              isVerifiedUser={false}
              numOfComment={totalComments}
              numOfLiked={post.likeCount}
              postedAt={new Date(post.createdAt)}
              tags={post.tags}
              title={post.title}
              userImgUrl={post.imagePaths?.[0] ?? DEFAULT_IMAGE_URL}
              userName={post.memberNickname}
            />
          )}

          <CommentArea
            postId={postId}
            currentMemberId={myInfo?.memberId}
            numOfComments={totalComments}
            myProfileImgUrl={userImgUrl || DEFAULT_IMAGE_URL}
            comments={comments}
          />
        </div>
        <div className={styles.subContent}>
          <RelatedPosts />
        </div>
      </div>
    </div>
  );
}
