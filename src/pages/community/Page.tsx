import { ContentArea } from '@/components/community/ContentArea';
import { SearchPostForm } from '@/components/community/SearchPostForm';
import UnAuthorizedModal from '@/components/common/unauthorized/UnAuthorizedModal';
import styles from './page.module.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useTranslation } from 'react-i18next';

export type postType = 'all' | 'normal' | 'used' | 'curation';

export default function CommunityPage() {
  const { t } = useTranslation('common');
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const [searchValue, setSearchValue] = useState<string>('');
  const [postType, setPostType] = useState<postType>('all');

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
          {t('communityPage.writePost')}
        </button>
      </div>
      <SearchPostForm
        searchValue={searchValue}
        onChangeSearchValue={value => setSearchValue(value)}
      />
      <ContentArea
        postType={postType}
        setPostType={setPostType}
        searchValue={searchValue}
      />
    </div>
  );
}
