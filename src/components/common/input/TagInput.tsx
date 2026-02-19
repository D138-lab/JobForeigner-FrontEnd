import { useEffect, useMemo, useRef, useState } from 'react';

import { X } from 'lucide-react';
import styles from './tagInput.module.scss';

interface TagInputProps {
  tags: string[];
  onChangeTags: (nextTags: string[]) => void;
  maxTags?: number;
  placeholder?: string;
  label?: string;
  helperText?: string;
}

export const TagInput = ({
  tags,
  onChangeTags,
  maxTags = 5,
  placeholder = '태그를 입력해주세요',
  label = '태그',
  helperText,
}: TagInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');

  const normalizedTags = useMemo(
    () => tags.map(t => t.trim()).filter(Boolean),
    [tags],
  );

  useEffect(() => {}, [tags]);

  const isMaxed = normalizedTags.length >= maxTags;

  const focusInput = () => inputRef.current?.focus();

  const sanitize = (raw: string) => {
    let t = raw.trim();
    if (!t) return '';
    if (t.startsWith('#')) t = t.slice(1);
    t = t.replace(/\s+/g, '');
    return t;
  };

  const addTag = (raw: string) => {
    const next = sanitize(raw);
    if (!next) return;

    const exists = normalizedTags.some(
      t => t.toLowerCase() === next.toLowerCase(),
    );
    if (exists) return;

    if (normalizedTags.length >= maxTags) return;

    onChangeTags([...normalizedTags, next]);
    setInputValue('');
  };

  const removeTag = (idx: number) => {
    const next = normalizedTags.filter((_, i) => i !== idx);
    onChangeTags(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue);
      return;
    }

    if (
      e.key === 'Backspace' &&
      inputValue.length === 0 &&
      normalizedTags.length > 0
    ) {
      removeTag(normalizedTags.length - 1);
      return;
    }
  };

  const help = helperText ?? `Press Enter to add a tag. Max ${maxTags} tags.`;

  return (
    <div className={styles.container}>
      <div className={styles.label}>{label}</div>

      <div
        className={styles.inputBox}
        onClick={focusInput}
        role='button'
        tabIndex={0}
      >
        <div className={styles.tagsRow}>
          {normalizedTags.map((tag, idx) => (
            <span key={`${tag}-${idx}`} className={styles.tagPill}>
              <span className={styles.tagText}>#{tag}</span>
              <button
                type='button'
                className={styles.removeBtn}
                onClick={e => {
                  e.stopPropagation();
                  removeTag(idx);
                }}
                aria-label='remove tag'
              >
                <X size={14} />
              </button>
            </span>
          ))}

          <input
            ref={inputRef}
            className={styles.input}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isMaxed ? '' : placeholder}
            disabled={isMaxed}
            aria-label='tag input'
          />
        </div>
      </div>

      <div className={styles.helper}>{help}</div>
    </div>
  );
};
