import styles from './ratingInfoBox.module.scss';

type Props = {
  title: string;
  value: string;
};

const RatingInfoBox = ({ title, value }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.topLine}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
      </div>
    </div>
  );
};

export default RatingInfoBox;
