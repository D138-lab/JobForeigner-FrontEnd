import styles from './salaryBox.module.scss';

type Props = {
  titleText: string;
  value: number;
  scale: string;
};

const SalaryBox = ({ titleText, value, scale }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleText}>{titleText}</div>
      <div className={styles.amount}>
        <div className={styles.value}>{value.toLocaleString()}</div>
        <div className={styles.scale}>{scale}</div>
      </div>
    </div>
  );
};

export default SalaryBox;
