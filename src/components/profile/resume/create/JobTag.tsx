import { X } from 'lucide-react';
import styles from './jobTag.module.scss';

export default function JobTag({
  children,
  handleRemoveJob,
}: {
  children: React.ReactNode;
  handleRemoveJob: () => void;
}) {
  return (
    <div className={styles.jobTag}>
      {children}
      <X className={styles.closeIcon} onClick={handleRemoveJob} />
    </div>
  );
}
