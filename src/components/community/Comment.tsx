import { CommentContentBox } from './CommentContentBox';
import { CommentDetailProps } from './CommentsArea';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { LikeAndCommentInComment } from './LikeAndCommentInComment';
import useDeleteBoardPostComment from '@/lib/apis/mutations/useDeleteBoardPostComment';
import styles from './comment.module.scss';

interface CommentProps extends CommentDetailProps {
  currentMemberId?: number;
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
}: CommentProps) => {
  const { mutate: deleteBoardPostComment, isPending } =
    useDeleteBoardPostComment();
  const isReply = parentId !== null;
  const isMine =
    typeof currentMemberId === 'number' && memberId === currentMemberId;

  const handleDelete = () => {
    if (isPending) return;
    if (!window.confirm('댓글을 삭제하시겠습니까?')) return;

    deleteBoardPostComment(
      { postId, commentId: id },
      {
        onSuccess: () => {
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
        <CommentContentBox
          isVerified={isVerifiedUser}
          userName={userName}
          country={country}
          content={content}
          postedAt={postedAt}
        />
        <LikeAndCommentInComment
          isLikedByMe={isLikedByMe}
          numOfLikes={numOfLiked}
          onClickComment={() => console.log('답글 클릭됨')}
          onClickLike={() => console.log('댓글 좋아요 클릭됨')}
        />
        {isMine && (
          <button
            type='button'
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? '삭제 중...' : '삭제하기'}
          </button>
        )}
      </div>
    </div>
  );
};
