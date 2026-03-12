import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './certificatesInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import { useTranslation } from 'react-i18next';

const certificate = {
  name: '',
  organization: '',
  date: '',
  number: '',
};

export default function CertificatesInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certificates',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('profile.resumePreview.sections.certificates')}</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(certificate)}
        >
          <Plus className={styles.plusIcon} />
          {t('profile.component.certificates.add')}
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>
          {t('profile.component.certificates.append')}
        </p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.certificateWrapper}>
          <div className={styles.certificateHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.certificateContent}>
            <div className={styles.nameAndOrganization}>
              <InputField
                control={control}
                name={`certificates.${index}.name`}
                label={t('profile.component.certificates.name')}
                placeholder={t('profile.component.certificates.namePlaceholder')}
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`certificates.${index}.organization`}
                label={t('profile.component.certificates.organization')}
                placeholder={t(
                  'profile.component.certificates.organizationPlaceholder',
                )}
                required={true}
                maxLength={30}
              />
            </div>
            <div className={styles.dateAndNumber}>
              <InputField
                control={control}
                name={`certificates.${index}.date`}
                label={t('profile.component.certificates.date')}
                placeholder={t('profile.component.certificates.dateExample')}
                required={true}
                maxLength={30}
              />
              {/* <InputField
                control={control}
                name={`certificates.${index}.number`}
                label='Certificate Number'
                placeholder='Enter certificate number'
                required={true}
                maxLength={30}
              /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
