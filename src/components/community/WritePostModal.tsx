import styles from './wirtePostModal.module.scss';

interface WritePostModalProps {
  onClose: () => void;
}

export const WritePostModal = ({ onClose }: WritePostModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <div className={styles.title}>글쓰기</div>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <div>WritePostModal 내용</div>
        </div>

        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            취소
          </button>
          <button
            className={styles.submitBtn}
            onClick={() => console.log('등록')}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};
