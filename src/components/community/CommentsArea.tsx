import { Comment } from './Comment';
import { InputComment } from './InputComment';
import { MessageCircle } from 'lucide-react';
import usePostBoardPostComment from '@/lib/apis/mutations/usePostBoardPostComment';
import styles from './commentsArea.module.scss';
import { useMemo, useState } from 'react';

export interface CommentDetailProps {
  id: number;
  memberId: number;
  postId: number;
  parentId: number | null;

  userName: string;
  country: string;
  isVerifiedUser: boolean;
  userProfileImgUrl: string;

  postedAt: Date;
  content: string;

  numOfLiked: number;
  isLikedByMe: boolean;
}

interface CommentAreaProps {
  postId: number;
  currentMemberId?: number;
  numOfComments: number;
  myProfileImgUrl: string;
  comments: CommentDetailProps[];
}

export const CommentArea = ({
  postId,
  currentMemberId,
  numOfComments,
  myProfileImgUrl,
  comments,
}: CommentAreaProps) => {
  const [inputText, setInputText] = useState<string>('');
  const { mutate: postBoardPostComment, isPending } = usePostBoardPostComment();

  const topLevelComments = useMemo(
    () =>
      comments.filter(
        comment => comment.parentId === null || comment.parentId === undefined,
      ),
    [comments],
  );
  const repliesByParentId = useMemo(() => {
    const replyMap = new Map<number, CommentDetailProps[]>();
    comments.forEach(comment => {
      if (comment.parentId === null || comment.parentId === undefined) return;
      const existingReplies = replyMap.get(comment.parentId) ?? [];
      existingReplies.push(comment);
      replyMap.set(comment.parentId, existingReplies);
    });
    return replyMap;
  }, [comments]);

  const handleSubmitComment = () => {
    const normalized = inputText.trim();
    if (!normalized) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    postBoardPostComment(
      {
        postId,
        body: { content: normalized },
      },
      {
        onSuccess: () => {
          setInputText('');
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
              '댓글 작성에 실패했습니다. 다시 시도해주세요.',
          );
        },
      },
    );
  };

  const handleSubmitReply = (parentId: number, content: string) => {
    const normalized = content.trim();
    if (!normalized) {
      alert('답글 내용을 입력해주세요.');
      return;
    }

    postBoardPostComment(
      {
        postId,
        body: { content: normalized, parentId },
      },
      {
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
              '답글 작성에 실패했습니다. 다시 시도해주세요.',
          );
        },
      },
    );
  };

  const renderCommentTree = (comment: CommentDetailProps) => {
    const replies = repliesByParentId.get(comment.id) ?? [];

    return (
      <div key={comment.id}>
        <Comment
          {...comment}
          currentMemberId={currentMemberId}
          onSubmitReply={handleSubmitReply}
          isSubmittingReply={isPending}
        />
        {replies.map(reply => renderCommentTree(reply))}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <MessageCircle size={30} />
        <span>댓글 {numOfComments}개</span>
      </div>
      <InputComment
        inputText={inputText}
        myProfileImgUrl={myProfileImgUrl}
        onChangeInputText={text => setInputText(text)}
        onSubmitComment={handleSubmitComment}
        isSubmitting={isPending}
      />
      <div className={styles.comments}>
        {topLevelComments.map(comment => renderCommentTree(comment))}
      </div>
    </div>
  );
};
