import { ContentArea } from '@/components/community/ContentArea';
import { SearchPostForm } from '@/components/community/SearchPostForm';
import UnAuthorizedModal from '@/components/common/unauthorized/UnAuthorizedModal';
import styles from './page.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';

export type postSortOption = 'recent' | 'popular' | 'verified';
export type postType = 'all' | 'normal' | 'used' | 'curation';

export default function CommunityPage() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [searchValue, setSearchValue] = useState<string>('');
  const [postType, setPostType] = useState<string>('all');
  const [postCategory, setPostCategory] = useState<string>('');
  void setSearchValue;
  void postCategory;
  void setPostCategory;

  const [sortOption, setSortOption] = useState<postSortOption>('recent');

  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      {!isLoggedIn && (
        <div className={styles.unAuthorizedModal}>
          <UnAuthorizedModal />
        </div>
      )}
      <div className={styles.topArea}>
        <button
          className={styles.newPostBtn}
          onClick={() => navigate('/community/write')}
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
    </div>
  );
}
