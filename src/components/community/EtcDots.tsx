import { Ban, Ellipsis, Flag } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import styles from './etcDots.module.scss';

interface EtcDotsProps {
  postId: number;
}

export const EtcDots = ({ postId }: EtcDotsProps) => {
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

      {isOpen && <MiniModal postId={postId} onClose={() => setIsOpen(false)} />}
    </div>
  );
};

interface MiniModalProps {
  onClose: () => void;
  postId: number;
}

const MiniModal = ({ onClose, postId }: MiniModalProps) => {
  const handleReport = (postId: number) => {
    console.log('신고하기 클릭', postId);
    onClose();
  };

  const handleBlock = () => {
    console.log('차단하기 클릭');
    onClose();
  };

  return (
    <div className={styles.modal}>
      <button onClick={() => handleReport(postId)}>
        <Flag size={20} />
        <span>신고하기</span>
      </button>
      <button onClick={handleBlock}>
        <Ban size={20} />
        <span>차단하기</span>
      </button>
    </div>
  );
};
