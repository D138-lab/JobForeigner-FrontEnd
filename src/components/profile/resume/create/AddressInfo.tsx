import styles from './addressInfo.module.scss';
import SelectField from '@/components/common/field/SelectField';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export default function AddressInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const sido = [
    { value: 'seoul', label: t('profile.component.address.sidoOptions.seoul') },
    { value: 'busan', label: t('profile.component.address.sidoOptions.busan') },
    { value: 'daegu', label: t('profile.component.address.sidoOptions.daegu') },
    {
      value: 'incheon',
      label: t('profile.component.address.sidoOptions.incheon'),
    },
    {
      value: 'gwangju',
      label: t('profile.component.address.sidoOptions.gwangju'),
    },
    {
      value: 'daejeon',
      label: t('profile.component.address.sidoOptions.daejeon'),
    },
    { value: 'ulsan', label: t('profile.component.address.sidoOptions.ulsan') },
  ];
  const sigungu = [
    {
      value: 'gangnam',
      label: t('profile.component.address.sigunguOptions.gangnam'),
    },
    {
      value: 'gangbuk',
      label: t('profile.component.address.sigunguOptions.gangbuk'),
    },
    {
      value: 'gangdong',
      label: t('profile.component.address.sigunguOptions.gangdong'),
    },
    {
      value: 'gangseo',
      label: t('profile.component.address.sigunguOptions.gangseo'),
    },
    { value: 'mapo', label: t('profile.component.address.sigunguOptions.mapo') },
    {
      value: 'seodaemun',
      label: t('profile.component.address.sigunguOptions.seodaemun'),
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('profile.resumePreview.fields.address')}</h2>
      <div className={styles.addressSection}>
        <SelectField
          control={control}
          name='sido'
          label={t('profile.component.address.sido')}
          required={true}
          options={sido}
        />
        <SelectField
          control={control}
          name='sigungu'
          label={t('profile.component.address.sigungu')}
          required={true}
          options={sigungu}
        />
      </div>
    </div>
  );
}
