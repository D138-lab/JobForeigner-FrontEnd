import styles from './basicInfo.module.scss';
import InputField from '../../../common/field/InputField';
import Button from '@/components/common/button/Button';
import { Camera } from 'lucide-react';
import { useFormContext } from 'react-hook-form';
import useImageUpload from '@/lib/hooks/useImageUpload';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function BasicInfo() {
  const { t } = useTranslation('pages');
  const { control, setValue } = useFormContext();
  const {
    image: uploadedImage,
    fileInputRef,
    handleImageUpload,
    handleUploadClick,
  } = useImageUpload(setValue);

  const name = useAuthStore(state => state.name);
  const email = useAuthStore(state => state.email);
  const phoneNumber = useAuthStore(state => state.phoneNumber);
  const address = useAuthStore(state => state.address);
  const profileImageUrl = useAuthStore(state => state.profileImageUrl);

  const image = uploadedImage || profileImageUrl;

  useEffect(() => {
    if (name) setValue('name', name);
    if (email) setValue('email', email);
    if (phoneNumber) setValue('phoneNumber', phoneNumber);
  }, [name, email, phoneNumber, setValue]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('profile.resumePreview.sections.basicInfo')}</h2>
      <InputField
        control={control}
        name='resumeTitle'
        label={t('communityWrite.labels.title')}
        required={true}
      />
      <div className={styles.content}>
        <div className={styles.textRow}>
          <div className={styles.readonlyField}>
            <label className={styles.label}>
              {t('profile.resumePreview.fields.name')}
            </label>
            <div className={styles.readonlyInput}>{name}</div>
          </div>
          <div className={styles.readonlyField}>
            <label className={styles.label}>
              {t('profile.resumePreview.fields.email')}
            </label>
            <div className={styles.readonlyInput}>{email}</div>
          </div>
          <div className={styles.readonlyField}>
            <label className={styles.label}>
              {t('profile.resumePreview.fields.phone')}
            </label>
            <div className={styles.readonlyInput}>{phoneNumber}</div>
          </div>
          <div className={styles.readonlyField}>
            <label className={styles.label}>
              {t('profile.resumePreview.fields.address')}
            </label>
            <div className={styles.readonlyInput}>
              {address.address}
              {address.detailAddress && ` ${address.detailAddress}`}
              {address.zipcode && ` (${address.zipcode})`}
            </div>
          </div>
        </div>
        <div className={styles.imageRow}>
          <div className={styles.imageWrapper}>
            {image ? (
              <img src={image} alt='profileImage' className={styles.image} />
            ) : (
              <div className={styles.placeholder}>
                <Camera />
              </div>
            )}
          </div>
          <input
            type='file'
            accept='image/*'
            ref={fileInputRef}
            onChange={handleImageUpload}
            hidden
          />
          <Button variant='outline' size='large' onClick={handleUploadClick}>
            {t('profile.component.basicInfo.uploadPhoto')}
          </Button>
        </div>
      </div>
    </div>
  );
}
