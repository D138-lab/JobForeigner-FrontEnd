import Input from '../common/input/Input';
import Select from '../common/select/Select';
import styles from './searchPostForm.module.scss';
import { useState } from 'react';

export const selectPostType = [
  { value: 'ALL', label: '전체' },
  { value: 'NORMAL_POST', label: '일반 게시글' },
  { value: 'USED_PRODUCT', label: '중고거래' },
  { value: 'CURATION', label: '큐레이션' },
];

export const selectPostCategory = [
  { value: 'ALL', label: '전체 카테고리' },
  { value: 'FREE_POST', label: '자유게시판' },
  { value: 'EMPLOYMENT_INFORMATION', label: '취업정보' },
  { value: 'VISA_WORK', label: '비자/업무' },
  { value: 'LIFE_INFORMATION', label: '생활정보' },
  { value: 'LANGUAGE', label: '언어교환' },
];

type Props = {
  defaultSearchValue: string;
  defaultPostType: string;
  defaultPostCategory: string;
  onClick: (
    searchValue: string,
    postType: string,
    postCategory: string,
  ) => void;
};

export const SearchPostForm = ({
  defaultSearchValue,
  defaultPostType,
  defaultPostCategory,
  onClick,
}: Props) => {
  const [searchValue, setSearchValue] = useState<string>(defaultSearchValue);
  const [postType, setPostType] = useState<string>(defaultPostType);
  const [postCategory, setPostCategory] = useState<string>(defaultPostCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClick(searchValue, postType, postCategory);
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

      <div className={styles.selectWrapper}>
        <Select
          options={selectPostType}
          value={postType}
          onChange={setPostType}
          name='postType'
        />
      </div>
      <div className={styles.selectWrapper}>
        <Select
          options={selectPostCategory}
          value={postCategory}
          onChange={setPostCategory}
          name='postCategory'
        />
      </div>
      <button type='submit' className={styles.searchButton}>
        검색
      </button>
    </form>
  );
};
