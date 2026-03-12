import { useTranslation } from 'react-i18next';
import styles from './languageSwitcher.module.scss';
import { Dispatch, SetStateAction } from 'react';

const options = [
  {
    label: '한국어',
    value: 'ko',
  },
  {
    label: 'English',
    value: 'en',
  },
  {
    label: 'Tiếng Việt',
    value: 'vi',
  },
  {
    label: '中文',
    value: 'zh',
  },
  {
    label: 'ไทย',
    value: 'th',
  },
  {
    label: 'Oʻzbekcha',
    value: 'uz',
  },
  {
    label: 'Bahasa Indonesia',
    value: 'id',
  },
  {
    label: 'नेपाली',
    value: 'ne',
  },
];

const LanguageSwitcher = ({
  setIsShow,
}: {
  setIsShow: Dispatch<SetStateAction<boolean>>;
}) => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
    setIsShow(false);
  };

  return (
    <div className={styles.wrapper}>
      {options.map((option: { label: string; value: string }) => (
        <button
          type='button'
          key={option.value}
          className={`${styles.item} ${
            currentLanguage.startsWith(option.value) ? styles.active : ''
          }`}
          onClick={() => handleChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
