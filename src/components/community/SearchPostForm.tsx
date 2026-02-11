import Input from '../common/input/Input';
import styles from './searchPostForm.module.scss';
import { useState } from 'react';

type Props = {
  defaultSearchValue: string;
  onClick: (searchValue: string) => void;
};

export const SearchPostForm = ({ defaultSearchValue, onClick }: Props) => {
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick(searchValue);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <div className={styles.inputWrapper}>
        <Input
          value={searchValue}
          icon='search'
          placeholder='게시글 검색'
          onChange={e => setSearchValue(e.currentTarget.value)}
        />
      </div>

      <button type='submit' className={styles.searchButton}>
        검색
      </button>
    </form>
  );
};
