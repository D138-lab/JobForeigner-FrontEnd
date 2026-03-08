import { CommentContentBox } from './CommentContentBox';
import { CommentDetailProps } from './CommentsArea';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { LikeAndCommentInComment } from './LikeAndCommentInComment';
import { MoreHorizontal } from 'lucide-react';
import useDeleteBoardPostComment from '@/lib/apis/mutations/useDeleteBoardPostComment';
import useDeleteBoardPostCommentLike from '@/lib/apis/mutations/useDeleteBoardPostCommentLike';
import usePostBoardPostCommentLike from '@/lib/apis/mutations/usePostBoardPostCommentLike';
import styles from './comment.module.scss';
import { useEffect, useState } from 'react';

interface CommentProps extends CommentDetailProps {
  currentMemberId?: number;
  onSubmitReply: (content: string) => void;
  isSubmittingReply?: boolean;
}

export const Comment = ({
  id,
  content,
  country,
  isLikedByMe,
  isVerifiedUser,
  memberId,
  numOfLiked,
  parentId,
  postId,
  postedAt,
  userName,
  userProfileImgUrl,
  currentMemberId,
  onSubmitReply,
  isSubmittingReply = false,
}: CommentProps) => {
  const { mutate: deleteBoardPostComment, isPending } =
    useDeleteBoardPostComment();
  const { mutate: postBoardPostCommentLike, isPending: isLikePending } =
    usePostBoardPostCommentLike();
  const { mutate: deleteBoardPostCommentLike, isPending: isUnlikePending } =
    useDeleteBoardPostCommentLike();
  const isReply = parentId !== null;
  const isMine =
    typeof currentMemberId === 'number' && memberId === currentMemberId;
  const [likedState, setLikedState] = useState(isLikedByMe);
  const [likeCountState, setLikeCountState] = useState(numOfLiked);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    setLikedState(isLikedByMe);
    setLikeCountState(numOfLiked);
  }, [isLikedByMe, numOfLiked]);

  const handleDelete = () => {
    if (isPending) return;
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    deleteBoardPostComment(
      { postId, commentId: id },
      {
        onSuccess: () => {
          setIsMenuOpen(false);
          alert('댓글이 삭제되었습니다.');
        },
        onError: error => {
          const errorData = (
            error as {
              response?: {
                data?: { message?: string; msg?: string };
              };
            }
          )?.response?.data;

          alert(
            errorData?.message ??
              errorData?.msg ??
              '댓글 삭제에 실패했습니다. 다시 시도해주세요.',
          );
        },
      },
    );
  };

  const handleLike = () => {
    if (isLikePending || isUnlikePending) return;

    const onSuccess = (response: {
      data: { liked: boolean; likeCount: number };
    }) => {
      setLikedState(response.data.liked);
      setLikeCountState(response.data.likeCount);
    };
    const onError = (error: unknown) => {
      const errorData = (
        error as {
          response?: {
            data?: { message?: string; msg?: string };
          };
        }
      )?.response?.data;

      alert(
        errorData?.message ??
          errorData?.msg ??
          '댓글 좋아요 처리에 실패했습니다. 다시 시도해주세요.',
      );
    };

    if (likedState) {
      deleteBoardPostCommentLike({ postId, commentId: id }, { onSuccess, onError });
      return;
    }

    postBoardPostCommentLike({ postId, commentId: id }, { onSuccess, onError });
  };

  const handleOpenReply = () => {
    setIsReplyOpen(prev => !prev);
    if (!isReplyOpen) {
      setReplyText(`@${userName} `);
    }
  };

  const handleSubmitReply = () => {
    const normalized = replyText.trim();
    if (!normalized) {
      alert('답글 내용을 입력해주세요.');
      return;
    }
    onSubmitReply(normalized);
    setReplyText('');
    setIsReplyOpen(false);
  };

  return (
    <div className={`${styles.container} ${isReply ? styles.reply : ''}`}>
      <div className={styles.left}>
        <img
          className={styles.image}
          src={userProfileImgUrl ?? DEFAULT_IMAGE_URL}
          alt='profileImage'
        />
      </div>
      <div className={styles.right}>
        {isReply ? <div className={styles.replyBadge}>↳ 답글</div> : null}
        <CommentContentBox
          isVerified={isVerifiedUser}
          userName={userName}
          country={country}
          content={content}
          postedAt={postedAt}
        />
        <LikeAndCommentInComment
          isLikedByMe={likedState}
          numOfLikes={likeCountState}
          onClickComment={handleOpenReply}
          onClickLike={handleLike}
        />
        {isReplyOpen && (
          <div className={styles.replyForm}>
            <textarea
              value={replyText}
              onChange={event => setReplyText(event.target.value)}
              placeholder='답글을 입력하세요'
              disabled={isSubmittingReply}
            />
            <div className={styles.replyActions}>
              <button
                type='button'
                className={styles.replyCancelButton}
                onClick={() => {
                  setIsReplyOpen(false);
                  setReplyText('');
                }}
                disabled={isSubmittingReply}
              >
                취소
              </button>
              <button
                type='button'
                className={styles.replySubmitButton}
                onClick={handleSubmitReply}
                disabled={isSubmittingReply}
              >
                {isSubmittingReply ? '등록 중...' : '답글 등록'}
              </button>
            </div>
          </div>
        )}
        {isMine && (
          <div className={styles.menuWrap}>
            <button
              type='button'
              className={styles.menuButton}
              onClick={() => setIsMenuOpen(prev => !prev)}
              aria-label='댓글 더보기'
              disabled={isPending}
            >
              <MoreHorizontal size={16} />
            </button>
            {isMenuOpen && (
              <button
                type='button'
                className={styles.deleteMenuButton}
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? '삭제 중...' : '삭제하기'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
