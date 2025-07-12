import { Check } from 'lucide-react';
import styles from './isCompanyUserCheckBox.module.scss';

type IsCompanyUserCheckBoxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export default function IsCompanyUserCheckBox({
  checked,
  onChange,
}: IsCompanyUserCheckBoxProps) {
  return (
    <div className={styles.container} onClick={() => onChange(!checked)}>
      <Check
        className={`${checked === true ? styles.checked : styles.unchecked}`}
      />
      <div>기업 사용자인가요 ?</div>
    </div>
  );
}
