import Button from '@/components/common/button/Button';
import styles from './employmentInfo.module.scss';
import { Plus, Trash } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import InputField from '@/components/common/field/InputField';
import TextareaField from '@/components/common/field/TextareaField';
import { useTranslation } from 'react-i18next';

const employment = {
  companyName: '',
  departmentName: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  achievement: '',
};

export default function EmploymentInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employments',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('profile.resumePreview.sections.experience')}</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(employment)}
        >
          <Plus className={styles.plusIcon} />
          {t('profile.component.employment.add')}
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>{t('profile.component.employment.append')}</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.employmentWrapper}>
          <div className={styles.employmentHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.employmentContent}>
            <div className={styles.nameAndSpot}>
              <InputField
                control={control}
                name={`employments.${index}.companyName`}
                label={t('profile.component.employment.company')}
                placeholder={t('profile.component.employment.companyPlaceholder')}
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`employments.${index}.departmentName`}
                label={t('profile.component.employment.department')}
                placeholder={t('profile.component.employment.departmentPlaceholder')}
                required={true}
                maxLength={30}
              />
            </div>
            <InputField
              control={control}
              name={`employments.${index}.jobTitle`}
              label={t('profile.component.employment.jobTitle')}
              placeholder={t('profile.component.employment.jobTitlePlaceholder')}
              required={true}
              maxLength={30}
            />
            <div className={styles.nameAndSpot}>
              <InputField
                control={control}
                name={`employments.${index}.startDate`}
                label={t('profile.component.employment.startDate')}
                placeholder='YYYY-MM-DD'
                required={true}
                type='date'
              />
              <InputField
                control={control}
                name={`employments.${index}.endDate`}
                label={t('profile.component.employment.endDate')}
                placeholder='YYYY-MM-DD'
                required={true}
                type='date'
              />
            </div>
            <TextareaField
              control={control}
              name={`employments.${index}.achievement`}
              label={t('profile.component.employment.achievement')}
              placeholder={t('profile.component.employment.achievementPlaceholder')}
              maxLength={2000}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
