import React from 'react';
import styles from './button.module.scss';
import clsx from 'clsx';

type ButtonVariant = 'default' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * - variant: 버튼 버전 "default" | "outline"
 *   - default: 기본 버튼
 *   - outline: 테두리 버튼
 * - size: 버튼 사이즈 설정 "small" | "medium" | "large"
 *   - small: 작은 버튼
 *   - medium: 중간 버튼
 *   - large: 큰 버튼
 * - children: 버튼 내용
 * - 나머지 props: (onClick, children 등) ButtonHTMLAttributes(button 태그의 속성)
 */
export default function Button({
  variant = 'default',
  size = 'small',
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size])}
      {...props}
    >
      {children}
    </button>
  );
}
