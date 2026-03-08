import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './expatInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import { useTranslation } from 'react-i18next';

const expat = {
  country: '',
  experience: '',
  startDate: '',
  endDate: '',
};

export default function ExpatInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expats',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('profile.resumePreview.sections.expats')}</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(expat)}
        >
          <Plus className={styles.plusIcon} />
          {t('profile.component.expat.add')}
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>{t('profile.component.expat.append')}</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.itemWrapper}>
          <div className={styles.itemHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.itemContent}>
            <div className={styles.row}>
              <InputField
                control={control}
                name={`expats.${index}.country`}
                label={t('profile.component.expat.country')}
                placeholder={t('profile.component.expat.countryPlaceholder')}
                required={true}
                maxLength={50}
              />
              <InputField
                control={control}
                name={`expats.${index}.experience`}
                label={t('profile.component.expat.experience')}
                placeholder={t('profile.component.expat.experiencePlaceholder')}
                required={true}
                maxLength={100}
              />
            </div>
            <div className={styles.row}>
              <InputField
                control={control}
                name={`expats.${index}.startDate`}
                label={t('profile.component.employment.startDate')}
                placeholder='YYYY-MM-DD'
                required={true}
                maxLength={10}
              />
              <InputField
                control={control}
                name={`expats.${index}.endDate`}
                label={t('profile.component.employment.endDate')}
                placeholder='YYYY-MM-DD'
                required={true}
                maxLength={10}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
