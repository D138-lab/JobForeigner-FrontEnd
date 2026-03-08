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
import { useTranslation } from 'react-i18next';

export default function DetailPage() {
  const { t } = useTranslation('pages');
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
  const toNumericId = (...values: unknown[]) => {
    for (const value of values) {
      const parsed =
        typeof value === 'number'
          ? value
          : typeof value === 'string'
            ? Number(value)
            : NaN;
      if (Number.isFinite(parsed) && parsed > 0) {
        return parsed;
      }
    }
    return null;
  };
  const normalizeName = (value: unknown) =>
    typeof value === 'string' ? value.trim().toLowerCase() : '';

  const myMemberId = toNumericId(myInfo?.memberId, (myInfo as any)?.member_id);
  const myMemberName = normalizeName(myInfo?.name);
  const postAuthorId = toNumericId(
    post?.memberId,
    (post as any)?.member_id,
    (post as any)?.writerId,
    (post as any)?.writer_id,
  );
  const postAuthorName = normalizeName(
    post?.memberNickname ??
      (post as any)?.member_nickname ??
      (post as any)?.writerName ??
      (post as any)?.writer_name,
  );
  const isMine =
    (myMemberId !== null &&
      postAuthorId !== null &&
      myMemberId === postAuthorId) ||
    (myMemberName !== '' && postAuthorName !== '' && myMemberName === postAuthorName);

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
        memberId: toNumericId(
          comment.memberId,
          (comment as any).member_id,
          (comment as any).writerId,
          (comment as any).writer_id,
        ) ?? 0,
        postId: comment.postId,
        parentId:
          toNumericId(
            (comment as any).parentId,
            (comment as any).parent_id,
            (comment as any).parentCommentId,
            (comment as any).parent_comment_id,
          ) ?? null,
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
        <span>{t('communityDetail.backToCommunity')}</span>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.mainContent}>
          {isPending && <div>{t('communityDetail.loadingPost')}</div>}
          {isError && (
            <div>
              {errorMessage?.message ??
                errorMessage?.msg ??
                t('communityDetail.loadPostFail')}
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
            currentMemberId={myMemberId ?? undefined}
            currentMemberName={myMemberName || undefined}
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
