import { postType } from '@/pages/community/Page';
import styles from './selectPostType.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  postType: postType;
  onClick: (type: postType) => void;
}

export const SelectPostType = ({ postType, onClick }: Props) => {
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      <span
        onClick={() => onClick('all')}
        className={`${styles.btn} ${
          postType === 'all' ? styles.selectedBtn : ''
        }`}
      >
        {t('communityPage.tabs.all')}
      </span>
      <span
        onClick={() => onClick('normal')}
        className={`${styles.btn} ${
          postType === 'normal' ? styles.selectedBtn : ''
        }`}
      >
        {t('communityPage.tabs.general')}
      </span>
      <span
        onClick={() => onClick('used')}
        className={`${styles.btn} ${
          postType === 'used' ? styles.selectedBtn : ''
        }`}
      >
        {t('communityPage.tabs.market')}
      </span>
      <span
        onClick={() => onClick('curation')}
        className={`${styles.btn} ${
          postType === 'curation' ? styles.selectedBtn : ''
        }`}
      >
        {t('communityPage.tabs.policy')}
      </span>
    </div>
  );
};
