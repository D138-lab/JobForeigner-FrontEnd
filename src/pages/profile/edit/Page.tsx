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

export default function ProfileEditPage() {
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
        alert('프로필 정보가 수정되었습니다');
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
          <h1>프로필 수정</h1>
          <Button
            variant='outline'
            size='medium'
            onClick={() => navigation(-1)}
          >
            <span className={styles.buttonContent}>
              <ArrowLeft className={styles.buttonIcon} />
              돌아가기
            </span>
          </Button>
        </div>
        <section>
          <h2>기본 정보</h2>
          <p>프로필의 기본 정보를 수정할 수 있습니다.</p>
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
