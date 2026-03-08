import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './languageInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import SelectField from '@/components/common/field/SelectField';
import { useTranslation } from 'react-i18next';

const language = {
  language: '',
  proficiency: '',
};

export default function LanguageInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const proficiencyOptions = [
    { value: 'BASIC', label: t('profile.component.language.basic') },
    {
      value: 'INTERMEDIATE',
      label: t('profile.component.language.intermediate'),
    },
    { value: 'ADVANCED', label: t('profile.component.language.advanced') },
    { value: 'FLUENT', label: t('profile.component.language.fluent') },
  ];
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('profile.resumePreview.sections.languages')}</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(language)}
        >
          <Plus className={styles.plusIcon} />
          {t('profile.component.language.add')}
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>{t('profile.component.language.append')}</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.itemWrapper}>
          <div className={styles.itemHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.itemContent}>
            <InputField
              control={control}
              name={`languages.${index}.language`}
              label={t('profile.resumePreview.sections.languages')}
              placeholder={t('profile.component.language.languagePlaceholder')}
              required={true}
              maxLength={20}
            />
            <SelectField
              control={control}
              name={`languages.${index}.proficiency`}
              label={t('profile.component.language.proficiency')}
              options={proficiencyOptions}
              required={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
