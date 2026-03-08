import { useFormContext } from 'react-hook-form';
import styles from './introductionInfo.module.scss';
import TextareaField from '@/components/common/field/TextareaField';
import { useTranslation } from 'react-i18next';

export default function IntroductionInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('profile.component.introduction.title')}</h2>
      <TextareaField
        control={control}
        name='introduction'
        label={t('profile.component.introduction.title')}
        placeholder={t('profile.component.introduction.placeholder')}
        maxLength={5000}
      />
    </div>
  );
}
