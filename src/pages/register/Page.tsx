import Card from '@/components/common/card/Card';
import styles from './page.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Progress from '@/components/common/progress/Progress';
import FirstSection from '@/components/register/FirstSection';
import SecondSection from '@/components/register/SecondSection';
import ThirdSection from '@/components/register/ThirdSections';
import FourthSection from '@/components/register/FourthSection';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterValues } from '@/lib/schemas/registerSchema';
import usePostForeignerSignup from '@/lib/apis/mutations/usePoseForeignerSignup';

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
  name: '',
  username: '',
  gender: '',
  phoneNumber: '',
  birthDate: '',
  address: '',
  detailAddress: '',
  zipcode: '',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(1);
  const formState = useForm({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });
  const { mutate, error, isPending, isError } = usePostForeignerSignup();

  const onSubmit = (data: RegisterValues) => {
    const { passwordConfirm, ...registerInfo } = data;
    mutate(registerInfo);
    console.log(
      `회원 가입 시도: ${registerInfo.email}, 에러: ${error} ${isError}`,
    );

    if (!isError) {
      navigate('/');
    }
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>JobForeigner</h1>
        <h2>회원가입</h2>
        <p>
          이미 계정이 있으신가요? <Link to='/login'>로그인</Link>
        </p>
        <div className={styles.progressBar}>
          <span>{progress} / 4 단계</span>
          <Progress value={progress * 25} />
        </div>
        <Card>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              {progress === 1 && <FirstSection setProgress={setProgress} />}
              {progress === 2 && <SecondSection setProgress={setProgress} />}
              {progress === 3 && <ThirdSection setProgress={setProgress} />}
              {progress === 4 && (
                <FourthSection
                  setProgress={setProgress}
                  isPending={isPending}
                />
              )}
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
