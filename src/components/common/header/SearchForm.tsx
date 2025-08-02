import { useEffect, useState } from 'react';

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

  const { data, refetch } = useGetSearch(keyword, false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = value.trim();
      if (trimmed) {
        setKeyword(trimmed);
      } else {
        setIsModalOn(false);
      }
    }
  };

  useEffect(() => {
    if (!keyword) return;

    refetch().then(res => {
      const result = res.data?.data?.content;
      setIsModalOn(Array.isArray(result) && result.length > 0);
    });
  }, [keyword]);

  return (
    <form className={styles.searchForm}>
      <button
        className={styles.searchButton}
        type='submit'
        onClick={e => e.preventDefault()}
      >
        <Search size={16} color='#b3b3b3' />
      </button>
      <input
        name='search'
        placeholder={t('searchRecruitment')}
        value={value}
        onChange={e => setValue(e.currentTarget.value)}
        onKeyDown={handleKeyDown}
      />
      <div className={styles.searched}>
        {isModalOn && <SearchResultForm content={data?.data.content!} />}
      </div>
    </form>
  );
}
