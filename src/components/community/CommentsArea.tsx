import { InputComment } from './InputComment';
import { MessageCircle } from 'lucide-react';
import styles from './commentsArea.module.scss';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useState } from 'react';

export interface CommentDetailProps {
  id: number;
  postId: number;
  parentId: number | null;

  userName: string;
  country: string;
  isVerifiedUser: boolean;

  postedAt: Date;
  content: string;

  numOfLiked: number;
  isLikedByMe: boolean;
}

interface CommentAreaProps {
  numOfComments: number;
  myProfileImgUrl: string;
  comments: CommentDetailProps[];
}

export const CommentArea = ({
  numOfComments,
  myProfileImgUrl,
  comments,
}: CommentAreaProps) => {
  const [inputText, setInputText] = useState<string>('');

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
        onSubmitComment={() => console.log('전송요청')}
      />
    </div>
  );
};
