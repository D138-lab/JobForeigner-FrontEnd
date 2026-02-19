import styles from './selectPostType.module.scss';

interface Props {
  postType: string;
  onClick: (type: string) => void;
}

export const SelectPostType = ({ postType, onClick }: Props) => {
  return (
    <div className={styles.container}>
      <span
        onClick={() => onClick('all')}
        className={`${styles.btn} ${
          postType === 'all' ? styles.selectedBtn : ''
        }`}
      >
        전체
      </span>
      <span
        onClick={() => onClick('normal')}
        className={`${styles.btn} ${
          postType === 'normal' ? styles.selectedBtn : ''
        }`}
      >
        일반 게시글
      </span>
      <span
        onClick={() => onClick('used')}
        className={`${styles.btn} ${
          postType === 'used' ? styles.selectedBtn : ''
        }`}
      >
        중고거래
      </span>
      <span
        onClick={() => onClick('curation')}
        className={`${styles.btn} ${
          postType === 'curation' ? styles.selectedBtn : ''
        }`}
      >
        정책 큐레이션
      </span>
    </div>
  );
};
