import { Comment } from './Comment';
import { InputComment } from './InputComment';
import { MessageCircle } from 'lucide-react';
import usePostBoardPostComment from '@/lib/apis/mutations/usePostBoardPostComment';
import styles from './commentsArea.module.scss';
import { useState } from 'react';

export interface CommentDetailProps {
  id: number;
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
  numOfComments: number;
  myProfileImgUrl: string;
  comments: CommentDetailProps[];
}

export const CommentArea = ({
  postId,
  numOfComments,
  myProfileImgUrl,
  comments,
}: CommentAreaProps) => {
  const [inputText, setInputText] = useState<string>('');
  const { mutate: postBoardPostComment, isPending } = usePostBoardPostComment();

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
        {comments.map(comment => (
          <Comment key={comment.id} {...comment} />
        ))}
      </div>
    </div>
  );
};
