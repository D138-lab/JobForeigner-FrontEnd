import styles from './reviewAndCommentBox.module.scss';

type Props = {
  icon: string;
  title: string;
  comment: string;
};

const ReviewAndCommentBox = ({ icon, title, comment }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <div className={styles.comment}>{comment}</div>
    </div>
  );
};

export default ReviewAndCommentBox;
