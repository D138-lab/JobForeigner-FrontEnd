import { Ban, Ellipsis, Flag, SquarePen, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import useDeleteBoardPost from '@/lib/apis/mutations/useDeleteBoardPost';
import styles from './etcDots.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('common');
  const { mutate: deleteBoardPost, isPending } = useDeleteBoardPost();
  const navigate = useNavigate();

  const handleReport = (postId: number) => {
    console.log('신고하기 클릭', postId);
    onClose();
  };

  const handleBlock = () => {
    console.log('차단하기 클릭');
    onClose();
  };

  const handleDelete = () => {
    if (!window.confirm(t('communityPage.postAction.confirmDelete'))) return;

    deleteBoardPost(postId, {
      onSuccess: () => {
        alert(t('communityPage.postAction.deleteSuccess'));
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
            t('communityPage.postAction.deleteFail'),
        );
      },
    });
  };

  const handleEdit = () => {
    navigate(`/community/${postId}/edit`);
    onClose();
  };

  return (
    <div className={styles.modal}>
      {isMine ? (
        <>
          <button onClick={handleEdit} disabled={isPending}>
            <SquarePen size={20} />
            <span>{t('communityPage.postAction.edit')}</span>
          </button>
          <button onClick={handleDelete} disabled={isPending}>
            <Trash2 size={20} />
            <span>
              {isPending
                ? t('communityPage.postAction.deleting')
                : t('communityPage.postAction.delete')}
            </span>
          </button>
        </>
      ) : (
        <>
          <button onClick={() => handleReport(postId)}>
            <Flag size={20} />
            <span>{t('communityPage.postAction.report')}</span>
          </button>
          <button onClick={handleBlock}>
            <Ban size={20} />
            <span>{t('communityPage.postAction.block')}</span>
          </button>
        </>
      )}
    </div>
  );
};
