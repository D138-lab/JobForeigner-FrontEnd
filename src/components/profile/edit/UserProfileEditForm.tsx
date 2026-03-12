import useImageUpload from '@/lib/hooks/useImageUpload';
import styles from './userProfileEditForm.module.scss';
import { useFormContext } from 'react-hook-form';
import Button from '@/components/common/button/Button';
import { Camera, Save } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import { useTranslation } from 'react-i18next';

export default function UserProfileEditForm() {
  const { t } = useTranslation('pages');
  const { control, setValue } = useFormContext();
  const { image, fileInputRef, handleImageUpload, handleUploadClick } =
    useImageUpload(setValue);

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
          name='email'
          label={t('profile.resumePreview.fields.email')}
          required={true}
        />
        <InputField
          control={control}
          name='phoneNumber'
          label={t('profile.resumePreview.fields.phone')}
          type='phone'
          required={true}
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
          name='detailAddress'
          label={t('profile.component.form.detailAddress')}
        />
        <InputField
          control={control}
          name='zipcode'
          label={t('profile.component.form.zipcode')}
          required={true}
        />
      </div>

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
