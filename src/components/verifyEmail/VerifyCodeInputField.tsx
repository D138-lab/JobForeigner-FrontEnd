import { RefObject, useEffect, useMemo, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './VerifyCodeInputField.module.scss';

interface VerifyCodeInputFieldProps {
  submitButtonRef: RefObject<HTMLButtonElement>;
}

/**
 * 6자리 이메일 인증 코드 입력 컴포넌트
 * - 각 칸은 1글자만 입력 가능
 * - 숫자만 허용, 입력 시 다음 칸으로 자동 이동
 * - Backspace 시 이전 칸으로 이동
 * - 붙여넣기 시 6자리 분배 입력
 */
export default function VerifyCodeInputField({
  submitButtonRef,
}: VerifyCodeInputFieldProps) {
  const { setValue, getValues, watch } = useFormContext();

  const names = useMemo(() => ['1', '2', '3', '4', '5', '6'] as const, []);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    // 최초 렌더링 시 첫 번째 칸에 포커스
    inputsRef.current[0]?.focus();
  }, []);

  const focusIndex = (idx: number) => {
    if (idx < 0 || idx >= names.length) {
      return;
    }

    inputsRef.current[idx]?.focus();
  };

  const handleChange = (idx: number, value: string) => {
    const onlyDigit = value.replace(/\D/g, '');
    const char = onlyDigit.slice(0, 1);
    setValue(names[idx], char);

    const isFilled = names.every(name => getValues(name));

    if (isFilled) {
      submitButtonRef?.current?.click();
    }

    if (char && idx < names.length - 1) {
      focusIndex(idx + 1);
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const key = e.key;
    const isCtrlMeta =
      (e.ctrlKey || e.metaKey) &&
      ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase());
    const isNoneNumeric = !/^[0-9]$/.test(key) && key.length === 1;

    if (isCtrlMeta) {
      return;
    }

    if (key === 'Backspace') {
      const current = (getValues(names[idx]) as string) ?? '';

      if (!current && idx > 0) {
        e.preventDefault();
        setValue(names[idx - 1], '');
        focusIndex(idx - 1);
      }

      return;
    }

    if (key === 'ArrowLeft') {
      e.preventDefault();
      focusIndex(Math.max(0, idx - 1));
      return;
    }

    if (key === 'ArrowRight') {
      e.preventDefault();
      focusIndex(Math.min(names.length - 1, idx + 1));
      return;
    }

    // 숫자 외 입력 방지
    if (isNoneNumeric) {
      e.preventDefault();
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const text = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, names.length);

    if (!text) {
      return;
    }

    for (let i = 0; i < text.length; i++) {
      const targetIdx = idx + i;
      if (targetIdx >= names.length) break;
      setValue(names[targetIdx], text[i]);
    }

    const next = Math.min(idx + text.length, names.length - 1);
    focusIndex(next);
  };

  // watch 값으로 리렌더링 유도
  watch(names);

  return (
    <div className={styles.container}>
      {names.map((name, idx) => (
        <div key={name} className={styles.inputBox}>
          <input
            ref={el => {
              if (el) inputsRef.current[idx] = el;
            }}
            className={styles.input}
            type='text'
            inputMode='numeric'
            autoComplete='one-time-code'
            pattern='[0-9]*'
            maxLength={1}
            value={(getValues(name) as string) ?? ''}
            onChange={e => handleChange(idx, e.target.value)}
            onKeyDown={e => handleKeyDown(e, idx)}
            onPaste={e => handlePaste(e, 0)}
            aria-label={`인증 코드 ${idx + 1}번째 숫자`}
          />
        </div>
      ))}
    </div>
  );
}
