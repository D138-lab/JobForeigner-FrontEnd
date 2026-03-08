import Button from '@/components/common/button/Button';
import styles from './page.module.scss';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import UserProfileEditForm from '@/components/profile/edit/UserProfileEditForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { userProfileEditSchema } from '@/lib/schemas/userProfileEditSchema';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useEffect } from 'react';
import usePatchUserProfileInfo from '@/lib/apis/mutations/usePatchUserProfileInfo';
import { useTranslation } from 'react-i18next';

export default function ProfileEditPage() {
  const { t } = useTranslation('pages');
  const navigation = useNavigate();

  const phoneNumber = useAuthStore(state => state.phoneNumber);
  const email = useAuthStore(state => state.email);
  const address = useAuthStore(state => state.address);
  const setPhoneNumber = useAuthStore(state => state.setPhoneNumber);
  const setEmail = useAuthStore(state => state.setEmail);
  const setAddress = useAuthStore(state => state.setAddress);

  const formState = useForm({
    defaultValues: {
      phoneNumber: '',
      email: '',
      address: '',
      detailAddress: '',
      zipcode: '',
    },
    resolver: zodResolver(userProfileEditSchema),
  });

  const { mutate: patchUserProfileInfo } = usePatchUserProfileInfo();

  useEffect(() => {
    if (phoneNumber && email && address) {
      formState.reset({
        phoneNumber,
        email,
        address: address.address,
        detailAddress: address.detailAddress,
        zipcode: address.zipcode,
      });
    }
  }, [phoneNumber, email, address]);

  const onSubmit = async (data: any) => {
    patchUserProfileInfo(data, {
      onSuccess: () => {
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
        setAddress({
          address: data.address,
          detailAddress: data.detailAddress,
          zipcode: data.zipcode,
        });
        alert(t('profile.edit.alertUpdated'));
        navigation('/profile');
      },
    });
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <div className={styles.title}>
          <h1>{t('profile.edit.title')}</h1>
          <Button
            variant='outline'
            size='medium'
            onClick={() => navigation(-1)}
          >
            <span className={styles.buttonContent}>
              <ArrowLeft className={styles.buttonIcon} />
              {t('profile.common.goBack')}
            </span>
          </Button>
        </div>
        <section>
          <h2>{t('profile.common.basicInfo')}</h2>
          <p>{t('profile.edit.description')}</p>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              <UserProfileEditForm />
            </form>
          </FormProvider>
        </section>
      </main>
    </div>
  );
}
