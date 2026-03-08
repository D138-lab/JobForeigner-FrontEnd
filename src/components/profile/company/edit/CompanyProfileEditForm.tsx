import { useFormContext } from 'react-hook-form';
import styles from './companyProfileEditForm.module.scss';
import InputField from '@/components/common/field/InputField';
import SelectField from '@/components/common/field/SelectField';
import TextareaField from '@/components/common/field/TextareaField';
import Button from '@/components/common/button/Button';
import { Camera, Save } from 'lucide-react';
import useImageUpload from '@/lib/hooks/useImageUpload';
import { useTranslation } from 'react-i18next';

export default function CompanyProfileEditForm() {
  const { t } = useTranslation('pages');
  const { control, setValue } = useFormContext();
  const { image, fileInputRef, handleImageUpload, handleUploadClick } =
    useImageUpload(setValue);
  const industryItems = [
    {
      label: t('profile.component.companyEditForm.industry.it'),
      value: 'it-dev',
    },
    {
      label: t('profile.component.companyEditForm.industry.service'),
      value: 'service',
    },
    {
      label: t('profile.component.companyEditForm.industry.manufacturing'),
      value: 'manufacturing',
    },
    {
      label: t('profile.component.companyEditForm.industry.education'),
      value: 'education',
    },
    {
      label: t('profile.component.companyEditForm.industry.office'),
      value: 'office',
    },
    {
      label: t('profile.component.companyEditForm.industry.sales'),
      value: 'sales',
    },
    {
      label: t('profile.component.companyEditForm.industry.design'),
      value: 'design',
    },
    {
      label: t('profile.component.companyEditForm.industry.others'),
      value: 'others',
    },
  ];

  return (
    <div className={styles.formWrapper}>
      <div className={styles.container}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            {image ? (
              <img src={image} alt='profileImage' className={styles.image} />
            ) : (
              <div className={styles.placeholder}></div>
            )}
            <input
              type='file'
              accept='image/*'
              ref={fileInputRef}
              onChange={handleImageUpload}
              hidden
            />
          </div>
          <button
            type='button'
            className={styles.button}
            onClick={handleUploadClick}
          >
            <Camera className={styles.icon} />
          </button>
        </div>
        <p className={styles.caption}>
          {t('profile.component.form.imageGuide')}
        </p>
      </div>
      <div className={styles.twoRow}>
        <InputField
          control={control}
          name='company'
          label={t('profile.component.companyEditForm.company')}
          required={true}
        />
        <InputField
          control={control}
          name='ceo'
          label={t('profile.component.companyInfo.ceo')}
          required={true}
        />
      </div>
      <div className={styles.twoRow}>
        <InputField
          control={control}
          name='businessNumber'
          label={t('profile.component.companyInfo.businessNumber')}
          required={true}
        />
        <SelectField
          control={control}
          name='industry'
          label={t('profile.component.companyEditForm.industry.label')}
          required={true}
          options={industryItems}
        />
      </div>
      <div className={styles.twoRow}>
        <InputField
          control={control}
          name='foundedYear'
          label={t('profile.component.companyInfo.foundedYear')}
          placeholder='2025'
        />
        <InputField
          control={control}
          name='employeeCount'
          label={t('profile.component.companyInfo.employeeCount')}
          placeholder='100'
        />
      </div>
      <InputField
        control={control}
        name='address'
        label={t('profile.resumePreview.fields.address')}
        required={true}
      />
      <div className={styles.twoRow}>
        <InputField
          control={control}
          type='phone'
          name='phone'
          label={t('profile.component.companyInfo.contact')}
          required={true}
        />
        <InputField
          control={control}
          name='email'
          label={t('profile.resumePreview.fields.email')}
          required={true}
        />
      </div>
      <InputField
        control={control}
        name='website'
        label={t('profile.component.companyInfo.website')}
        placeholder='https://'
      />
      <TextareaField
        control={control}
        name='description'
        label={t('profile.component.companyInfo.intro')}
        placeholder={t('profile.component.companyEditForm.introPlaceholder')}
      />
      <div className={styles.actions}>
        <Button size='medium'>
          <span className={styles.buttonText}>
            <Save />
            {t('profile.component.form.save')}
          </span>
        </Button>
      </div>
    </div>
  );
}
