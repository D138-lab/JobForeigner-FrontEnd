import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './educationInfo.module.scss';
import { Trash } from 'lucide-react';
import Button from '@/components/common/button/Button';
import { Plus } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import SelectField from '@/components/common/field/SelectField';
import { useTranslation } from 'react-i18next';

const defaultEducation = {
  educationName: '',
  major: '',
  yearOfGraduation: '',
  degree: '',
  graduationStatus: '',
  etc: '',
};

export default function EducationInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const degreeOptions = [
    { value: 'BACHELOR', label: t('profile.component.education.degree.bachelor') },
    { value: 'MASTER', label: t('profile.component.education.degree.master') },
    { value: 'DOCTOR', label: t('profile.component.education.degree.doctor') },
  ];

  const graduationStatusOptions = [
    { value: 'GRADUATED', label: t('profile.component.education.status.graduated') },
    { value: 'COMPLETED', label: t('profile.component.education.status.completed') },
    { value: 'STUDYING', label: t('profile.component.education.status.studying') },
  ];
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('profile.resumePreview.sections.education')}</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(defaultEducation)}
        >
          <Plus className={styles.plusIcon} />
          {t('profile.component.education.add')}
        </Button>
      </div>

      {!fields.length && (
        <p className={styles.appendText}>{t('profile.component.education.append')}</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className={styles.educationWrapper}>
          <div className={styles.educationHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.educationContent}>
            <div className={styles.educationAndMajor}>
              <InputField
                control={control}
                name={`educations.${index}.educationName`}
                label={t('profile.component.education.school')}
                placeholder={t('profile.component.education.schoolPlaceholder')}
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`educations.${index}.major`}
                label={t('profile.component.education.major')}
                placeholder={t('profile.component.education.majorPlaceholder')}
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`educations.${index}.yearOfGraduation`}
                label={t('profile.component.education.year')}
                placeholder={t('profile.component.education.yearExample')}
                required={true}
              />
            </div>
            <div className={styles.educationAndMajor}>
              <SelectField
                control={control}
                name={`educations.${index}.degree`}
                label={t('profile.component.education.degree.label')}
                required={true}
                options={degreeOptions}
              />
              <SelectField
                control={control}
                name={`educations.${index}.graduationStatus`}
                label={t('profile.component.education.status.label')}
                required={true}
                options={graduationStatusOptions}
              />
            </div>

            <InputField
              control={control}
              name={`educations.${index}.etc`}
              label={t('profile.component.education.etc')}
              placeholder={t('profile.component.education.etcPlaceholder')}
              required={false}
              maxLength={2000}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
