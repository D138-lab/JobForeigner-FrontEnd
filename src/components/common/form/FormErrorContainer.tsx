import styles from './formErrorContainer.module.scss';

export default function FormErrorContainer({
  error,
}: {
  error: string | null;
}) {
  return <>{error && <div className={styles.errorContainer}>{error}</div>}</>;
}
