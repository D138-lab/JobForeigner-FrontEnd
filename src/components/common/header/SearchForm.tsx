import { useEffect, useRef, useState } from 'react';

import { Search } from 'lucide-react';
import SearchResultForm from './SearchResultForm';
import styles from './searchForm.module.scss';
import useGetSearch from '@/lib/apis/queries/useGetSearch';
import { useTranslation } from 'react-i18next';

export default function SearchForm() {
  const { t } = useTranslation('common');

  const [value, setValue] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const [isModalOn, setIsModalOn] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLFormElement>(null);

  const { data, refetch } = useGetSearch(keyword, false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();

    if (trimmed) {
      setKeyword(trimmed);
      return;
    }

    setIsModalOn(false);
  };

  useEffect(() => {
    if (!keyword) return;

    refetch().then(res => {
      const result = res.data?.data?.content;
      setIsModalOn(Array.isArray(result) && result.length > 0);
    });
  }, [keyword]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsModalOn(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <form ref={wrapperRef} className={styles.searchForm} onSubmit={handleSubmit}>
      <div className={styles.searchField}>
        <Search className={styles.searchIcon} size={18} />
        <input
          name='search'
          placeholder={t('searchRecruitment')}
          value={value}
          onChange={e => {
            const nextValue = e.currentTarget.value;
            setValue(nextValue);
            if (nextValue.trim() === '') {
              setKeyword('');
              setIsModalOn(false);
            }
          }}
        />
        <button className={styles.searchButton} type='submit'>
          {t('search')}
        </button>
      </div>
      <div className={`${styles.searched} ${!isModalOn ? styles.inactive : ''}`}>
        <div className={styles.resultHeader}>
          <span>{t('searchResults')}</span>
          <span className={styles.resultCount}>
            {data?.data?.content?.length ?? 0}
          </span>
        </div>
        {isModalOn && <SearchResultForm content={data?.data?.content ?? []} />}
      </div>
    </form>
  );
}
