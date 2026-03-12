import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './awardsInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import TextareaField from '@/components/common/field/TextareaField';
import { useTranslation } from 'react-i18next';
const award = {
  name: '',
  organization: '',
  date: '',
  description: '',
};

export default function AwardsInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'awards',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('profile.resumePreview.sections.awards')}</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(award)}
        >
          <Plus className={styles.plusIcon} />
          {t('profile.component.awards.add')}
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>{t('profile.component.awards.append')}</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.awardWrapper}>
          <div className={styles.awardHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.awardContent}>
            <div className={styles.nameAndOrganization}>
              <InputField
                control={control}
                name={`awards.${index}.name`}
                label={t('profile.component.awards.name')}
                placeholder={t('profile.component.awards.namePlaceholder')}
                required={true}
                maxLength={50}
              />
              <InputField
                control={control}
                name={`awards.${index}.organization`}
                label={t('profile.component.awards.organization')}
                placeholder={t('profile.component.awards.organizationPlaceholder')}
                required={true}
                maxLength={30}
              />
            </div>
            <InputField
              control={control}
              name={`awards.${index}.date`}
              label={t('profile.component.awards.date')}
              placeholder={t('profile.component.awards.dateExample')}
              required={true}
              maxLength={30}
            />
            <TextareaField
              control={control}
              name={`awards.${index}.description`}
              label={t('profile.component.awards.description')}
              placeholder={t('profile.component.awards.descriptionPlaceholder')}
              maxLength={2000}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
