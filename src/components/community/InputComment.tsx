import Button from '../common/button/Button';
import { DEFAULT_IMAGE_URL } from '@/lib/utils/defaultImageUrl';
import { Send } from 'lucide-react';
import styles from './inputComment.module.scss';

interface InputCommentProps {
  myProfileImgUrl: string;
  inputText: string;
  onChangeInputText: (text: string) => void;
  onSubmitComment: () => void;
}

export const InputComment = ({
  myProfileImgUrl,
  inputText,
  onChangeInputText,
  onSubmitComment,
}: InputCommentProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img
          className={styles.image}
          src={myProfileImgUrl ?? DEFAULT_IMAGE_URL}
          alt='profileImage'
        />
      </div>

      <div className={styles.right}>
        <div className={styles.inputArea}>
          <textarea
            value={inputText}
            onChange={e => onChangeInputText(e.target.value)}
            placeholder='댓글을 입력하세요'
          />
        </div>
        <div className={styles.submitArea}>
          <div className={styles.subText}>서로 존중하며 예의를 지켜주세요.</div>
          <button className={styles.commentBtn} onClick={onSubmitComment}>
            <Send size={20} />
            <span>댓글 작성</span>
          </button>
        </div>
      </div>
    </div>
  );
};
