import { Mail, MapPin, Search, Lock } from 'lucide-react';
import styles from './input.module.scss';
import clsx from 'clsx';
import { forwardRef } from 'react';

const getIcon = (icon?: string) => {
  switch (icon) {
    case 'search':
      return <Search className={styles.icon} />;
    case 'map-pin':
      return <MapPin className={styles.icon} />;
    case 'email':
      return <Mail className={styles.icon} />;
    case 'password':
      return <Lock className={styles.icon} />;
    default:
      return null;
  }
};

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  rounded?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, rounded = false, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {getIcon(icon)}
        <input
          ref={ref}
          className={clsx(
            styles.input,
            icon && styles.isIcon,
            rounded && styles.rounded,
          )}
          onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
          {...props}
        />
      </div>
    );
  },
);

export default Input;
