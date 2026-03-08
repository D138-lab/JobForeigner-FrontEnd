import Input from '../common/input/Input';
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
      <div className={styles.inputWrapper}>
        <Input
          value={searchValue}
          icon='search'
          placeholder={t('communityPage.searchPlaceholder')}
          onChange={e => onChangeSearchValue(e.currentTarget.value)}
        />
      </div>

      <button type='submit' className={styles.searchButton}>
        {t('communityPage.searchButton')}
      </button>
    </form>
  );
};
