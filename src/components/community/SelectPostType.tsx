import { postType } from '@/pages/community/Page';
import styles from './selectPostType.module.scss';
import { useTranslation } from 'react-i18next';

interface Props {
  postType: postType;
  onClick: (type: postType) => void;
}

export const SelectPostType = ({ postType, onClick }: Props) => {
  const { t } = useTranslation('common');
  const items: { key: postType; label: string }[] = [
    { key: 'all', label: t('communityPage.tabs.all') },
    { key: 'normal', label: t('communityPage.tabs.general') },
    { key: 'used', label: t('communityPage.tabs.market') },
    { key: 'curation', label: t('communityPage.tabs.policy') },
  ];

  return (
    <div className={styles.container}>
      {items.map(item => (
        <button
          key={item.key}
          type='button'
          onClick={() => onClick(item.key)}
          className={`${styles.btn} ${
            postType === item.key ? styles.selectedBtn : ''
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
