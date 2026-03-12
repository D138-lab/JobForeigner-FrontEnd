import { useFormContext } from 'react-hook-form';
import styles from './jobPreferenceInfo.module.scss';
import InputField from '@/components/common/field/InputField';
import SelectField from '@/components/common/field/SelectField';
import { useTranslation } from 'react-i18next';

export default function JobPreferenceInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const employmentTypeOptions = [
    { value: 'FULL_TIME', label: t('profile.component.jobPreference.fullTime') },
    { value: 'CONTRACT', label: t('profile.component.jobPreference.contract') },
    { value: 'INTERN', label: t('profile.component.jobPreference.intern') },
    { value: 'ANY', label: t('profile.component.jobPreference.any') },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('profile.resumePreview.sections.preference')}</h2>
      <div className={styles.content}>
        <div className={styles.row}>
          <SelectField
            control={control}
            name='jobPreference.desiredEmploymentType'
            label={t('profile.resumePreview.fields.employmentType')}
            options={employmentTypeOptions}
            required={true}
          />
          <InputField
            control={control}
            name='jobPreference.desiredSalary'
            label={t('profile.component.jobPreference.desiredSalaryLabel')}
            placeholder={t('profile.component.jobPreference.desiredSalaryLabel')}
            required={true}
            type='number'
            min={0}
          />
        </div>
        <InputField
          control={control}
          name='jobPreference.desiredLocation'
          label={t('profile.resumePreview.fields.desiredLocation')}
          placeholder={t('profile.component.jobPreference.desiredLocationExample')}
          required={true}
        />
      </div>
    </div>
  );
}
