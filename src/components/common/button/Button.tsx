import React from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

type ButtonVariant = 'default' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  color?: string;
}

/**
 * - variant: 버튼 버전 "default" | "outline" | "ghost"
 *   - default: 기본 버튼
 *   - outline: 테두리 버튼
 *   - ghost: 투명 버튼
 * - size: 버튼 사이즈 설정 "small" | "medium" | "large"
 *   - small: 작은 버튼
 *   - medium: 중간 버튼
 *   - large: 큰 버튼
 * - children: 버튼 내용
 * - 나머지 props: (onClick, children 등) ButtonHTMLAttributes(button 태그의 속성)
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'small', children, color, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(styles.button, styles[variant], styles[size])}
        style={{ backgroundColor: color }}
        {...props}
      >
        {children}
      </button>
    );
  },
);

export default Button;
