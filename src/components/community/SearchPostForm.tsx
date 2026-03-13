import { Search } from 'lucide-react';
import styles from './searchPostForm.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
  searchValue: string;
  onChangeSearchValue: (searchValue: string) => void;
};

export const SearchPostForm = ({ searchValue, onChangeSearchValue }: Props) => {
  const { t } = useTranslation('common');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChangeSearchValue(searchValue.trim());
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <Search size={18} className={styles.searchIcon} />
      <input
        value={searchValue}
        onChange={e => onChangeSearchValue(e.currentTarget.value)}
        placeholder={t('communityPage.searchPlaceholder')}
        className={styles.searchInput}
      />
      <button type='submit' className={styles.searchButton}>
        {t('communityPage.searchButton')}
      </button>
    </form>
  );
};
