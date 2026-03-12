import { Globe } from 'lucide-react';
import styles from './languageButton.module.scss';
import LanguageSwitcher from './LanguageSwitcher';
import { useEffect, useRef, useState } from 'react';

export default function LanguageButton() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type='button'
        className={styles.languageButton}
        aria-label='Change language'
        aria-expanded={isShow}
        onClick={() => setIsShow(prev => !prev)}
      >
        <Globe size={18} color='currentColor' />
      </button>
      {isShow && <LanguageSwitcher setIsShow={setIsShow} />}
    </div>
  );
}
