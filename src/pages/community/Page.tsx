import {
  SearchPostForm,
  selectPostCategory,
} from '@/components/community/SearchPostForm';

import { ContentArea } from '@/components/community/ContentArea';
import styles from './page.module.scss';
import { useState } from 'react';

export type postSortOption = 'recent' | 'popular' | 'verified';
export type postType = 'all' | 'normal' | 'used' | 'curation';

export default function CommunityPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [postType, setPostType] = useState<string>('all');
  const [postCategory, setPostCategory] = useState<string>('');

  const [sortOption, setSortOption] = useState<postSortOption>('recent');

  return (
    <div className={styles.container}>
      <SearchPostForm
        defaultSearchValue={searchValue}
        defaultPostType={postType}
        defaultPostCategory={postCategory}
        onClick={(a, b, c) => console.log(a, b, c)}
      />
      <ContentArea
        sortOption={sortOption}
        setSortOption={setSortOption}
        postType={postType}
        setPostType={setPostType}
      />
    </div>
  );
}
