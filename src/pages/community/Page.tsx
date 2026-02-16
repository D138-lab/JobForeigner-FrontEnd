import { ContentArea } from '@/components/community/ContentArea';
import { SearchPostForm } from '@/components/community/SearchPostForm';
import { WritePostModal } from '@/components/community/WritePostModal';
import styles from './page.module.scss';
import { useState } from 'react';

export type postSortOption = 'recent' | 'popular' | 'verified';
export type postType = 'all' | 'normal' | 'used' | 'curation';

export default function CommunityPage() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [postType, setPostType] = useState<string>('all');
  const [postCategory, setPostCategory] = useState<string>('');

  const [sortOption, setSortOption] = useState<postSortOption>('recent');

  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.topArea}>
        <button
          className={styles.newPostBtn}
          onClick={() => setIsWriteModalOpen(true)}
        >
          글쓰기
        </button>
      </div>
      <SearchPostForm
        defaultSearchValue={searchValue}
        onClick={a => console.log(a)}
      />
      <ContentArea
        sortOption={sortOption}
        setSortOption={setSortOption}
        postType={postType}
        setPostType={setPostType}
      />

      {isWriteModalOpen && (
        <WritePostModal onClose={() => setIsWriteModalOpen(false)} />
      )}
    </div>
  );
}
