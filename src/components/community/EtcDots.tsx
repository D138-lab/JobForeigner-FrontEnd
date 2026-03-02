import { Ban, Ellipsis, Flag, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import useDeleteBoardPost from '@/lib/apis/mutations/useDeleteBoardPost';
import styles from './etcDots.module.scss';

interface EtcDotsProps {
  postId: number;
  isMine?: boolean;
  onDeleted?: () => void;
}

export const EtcDots = ({ postId, isMine = false, onDeleted }: EtcDotsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container} ref={wrapperRef}>
      <Ellipsis
        className={styles.icon}
        onClick={() => setIsOpen(prev => !prev)}
      />

      {isOpen && (
        <MiniModal
          postId={postId}
          isMine={isMine}
          onClose={() => setIsOpen(false)}
          onDeleted={onDeleted}
        />
      )}
    </div>
  );
};

interface MiniModalProps {
  onClose: () => void;
  postId: number;
  isMine: boolean;
  onDeleted?: () => void;
}

const MiniModal = ({ onClose, postId, isMine, onDeleted }: MiniModalProps) => {
  const { mutate: deleteBoardPost, isPending } = useDeleteBoardPost();

  const handleReport = (postId: number) => {
    console.log('신고하기 클릭', postId);
    onClose();
  };

  const handleBlock = () => {
    console.log('차단하기 클릭');
    onClose();
  };

  const handleDelete = () => {
    if (!window.confirm('게시글을 삭제하시겠습니까?')) return;

    deleteBoardPost(postId, {
      onSuccess: () => {
        alert('게시글이 삭제되었습니다.');
        onClose();
        onDeleted?.();
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
            '게시글 삭제에 실패했습니다. 다시 시도해주세요.',
        );
      },
    });
  };

  return (
    <div className={styles.modal}>
      {isMine ? (
        <button onClick={handleDelete} disabled={isPending}>
          <Trash2 size={20} />
          <span>{isPending ? '삭제 중...' : '삭제하기'}</span>
        </button>
      ) : (
        <>
          <button onClick={() => handleReport(postId)}>
            <Flag size={20} />
            <span>신고하기</span>
          </button>
          <button onClick={handleBlock}>
            <Ban size={20} />
            <span>차단하기</span>
          </button>
        </>
      )}
    </div>
  );
};
