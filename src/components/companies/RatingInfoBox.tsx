import styles from './ratingInfoBox.module.scss';

type Props = {
  title: string;
  value: string;
  description?: string;
};

const RatingInfoBox = ({ title, value, description }: Props) => {
  const numericValue = Number(value);
  const percentage = Number.isNaN(numericValue)
    ? 0
    : Math.max(0, Math.min(100, (numericValue / 5) * 100));

  return (
    <div className={styles.container}>
      <div className={styles.topLine}>
        <div className={styles.title}>{title}</div>
        <div className={styles.valueBox}>
          <div className={styles.value}>{value}</div>
          <div className={styles.scale}>/5</div>
        </div>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ width: `${percentage}%` }} />
      </div>
      {description ? <div className={styles.description}>{description}</div> : null}
    </div>
  );
};

export default RatingInfoBox;
