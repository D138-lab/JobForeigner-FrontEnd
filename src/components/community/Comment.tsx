import { CommentContentBox } from './CommentContentBox';
import { CommentDetailProps } from './CommentsArea';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { LikeAndCommentInComment } from './LikeAndCommentInComment';
import { MoreHorizontal } from 'lucide-react';
import useDeleteBoardPostComment from '@/lib/apis/mutations/useDeleteBoardPostComment';
import useDeleteBoardPostCommentLike from '@/lib/apis/mutations/useDeleteBoardPostCommentLike';
import usePostBoardPostCommentLike from '@/lib/apis/mutations/usePostBoardPostCommentLike';
import useGetTranslatedBoardPostComment from '@/lib/apis/queries/useGetTranslatedBoardPostComment';
import { resolveTranslationLanguage } from '@/lib/utils/translation';
import styles from './comment.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface CommentProps extends CommentDetailProps {
  currentMemberId?: number;
  currentMemberName?: string;
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
  currentMemberName,
  onSubmitReply,
  isSubmittingReply = false,
}: CommentProps) => {
  const { i18n } = useTranslation();
  const { mutate: deleteBoardPostComment, isPending } =
    useDeleteBoardPostComment();
  const { mutate: postBoardPostCommentLike, isPending: isLikePending } =
    usePostBoardPostCommentLike();
  const { mutate: deleteBoardPostCommentLike, isPending: isUnlikePending } =
    useDeleteBoardPostCommentLike();
  const isReply = parentId !== null;
  const normalizedCurrentName = currentMemberName?.trim().toLowerCase() ?? '';
  const normalizedUserName = userName.trim().toLowerCase();
  const isMine =
    (typeof currentMemberId === 'number' && memberId === currentMemberId) ||
    (normalizedCurrentName !== '' && normalizedCurrentName === normalizedUserName);
  const [likedState, setLikedState] = useState(isLikedByMe);
  const [likeCountState, setLikeCountState] = useState(numOfLiked);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [showTranslated, setShowTranslated] = useState(false);
  const menuWrapRef = useRef<HTMLDivElement>(null);
  const translationLanguage = resolveTranslationLanguage(i18n.language);
  const {
    data: translatedCommentData,
    isFetching: isTranslationFetching,
    refetch: refetchTranslatedComment,
  } = useGetTranslatedBoardPostComment(postId, id, translationLanguage, false);
  const translatedContent = translatedCommentData?.data.content;
  const displayContent =
    showTranslated && translatedContent ? translatedContent : content;

  useEffect(() => {
    setLikedState(isLikedByMe);
    setLikeCountState(numOfLiked);
  }, [isLikedByMe, numOfLiked]);

  useEffect(() => {
    setShowTranslated(false);
  }, [content, id, translationLanguage]);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        menuWrapRef.current &&
        !menuWrapRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isMenuOpen]);

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

  const handleToggleTranslation = async () => {
    if (!translationLanguage || isTranslationFetching) return;

    if (showTranslated) {
      setShowTranslated(false);
      return;
    }

    if (translatedContent) {
      setShowTranslated(true);
      return;
    }

    const result = await refetchTranslatedComment();

    if (result.data?.data.content) {
      setShowTranslated(true);
      return;
    }

    const errorData = (
      result.error as {
        response?: {
          data?: { message?: string; msg?: string };
        };
      }
    )?.response?.data;

    alert(
      errorData?.message ??
        errorData?.msg ??
        '댓글 번역에 실패했습니다. 다시 시도해주세요.',
    );
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
        <div className={styles.commentBox}>
          {isMine && (
            <div className={styles.menuWrap} ref={menuWrapRef}>
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
          <CommentContentBox
            isVerified={isVerifiedUser}
            userName={userName}
            country={country}
            content={displayContent}
            postedAt={postedAt}
            onClickTranslate={handleToggleTranslation}
            translationLabel={
              isTranslationFetching
                ? '번역 중...'
                : showTranslated
                  ? '원문 보기'
                  : '번역 보기'
            }
            showTranslateAction={!!translationLanguage}
            hasMenu={isMine}
          />
        </div>
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
      </div>
    </div>
  );
};
