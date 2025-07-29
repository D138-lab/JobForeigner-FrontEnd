import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterValues, registerSchema } from '@/lib/schemas/registerSchema';

import Button from '@/components/common/button/Button';
import Card from '@/components/common/card/Card';
import CompanyFourthSection from '@/components/register/CompanyFourthSection';
import CompletedCompanyRegister from '@/components/register/CompletedCompanyRegister';
import FirstSection from '@/components/register/FirstSection';
import FourthSection from '@/components/register/FourthSection';
import IsCompanyUserCheckBox from '@/components/register/IsCompanyUser.CheckBox';
import Progress from '@/components/common/progress/Progress';
import SecondSection from '@/components/register/SecondSection';
import ThirdSection from '@/components/register/ThirdSections';
import styles from './page.module.scss';
import usePostCompanyUserSignup from '@/lib/apis/mutations/usePostCompanyUserSignup';
import usePostForeignerSignup from '@/lib/apis/mutations/usePoseForeignerSignup';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

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
  profileImageUrl: 'default',
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(1);
  const [isCompanyUser, setIsCompanyUser] = useState(false);
  const formState = useForm({
    defaultValues,
    resolver: zodResolver(registerSchema),
  });
  const foreignerSignup = usePostForeignerSignup();
  const companyUserSignup = usePostCompanyUserSignup();
  const isPending = isCompanyUser
    ? companyUserSignup.isPending
    : foreignerSignup.isPending;

  const onSubmit = (data: RegisterValues) => {
    const { passwordConfirm, ...registerInfo } = data;
    if (isCompanyUser) {
      companyUserSignup.mutate(registerInfo, {
        onSuccess: () => navigate('/'),
        onError: err => console.error('기업 회원가입 실패:', err),
      });
    } else {
      foreignerSignup.mutate(registerInfo, {
        onSuccess: () => navigate('/'),
        onError: err => console.error('외국인 회원가입 실패:', err),
      });
    }

    console.log(
      `회원 가입 시도: ${registerInfo.email}, 기업 사용자: ${isCompanyUser}`,
    );
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
          <span>
            {progress} / {isCompanyUser ? 5 : 4} 단계
          </span>
          <Progress value={isCompanyUser ? progress * 20 : progress * 25} />
        </div>
        <IsCompanyUserCheckBox
          checked={isCompanyUser}
          onChange={setIsCompanyUser}
        />
        <Card>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              {progress === 1 && <FirstSection setProgress={setProgress} />}
              {progress === 2 && <SecondSection setProgress={setProgress} />}
              {progress === 3 && <ThirdSection setProgress={setProgress} />}
              {progress === 4 && !isCompanyUser && (
                <FourthSection
                  setProgress={setProgress}
                  isPending={isPending}
                />
              )}
              {isCompanyUser && progress === 4 && (
                <CompanyFourthSection setProgress={setProgress} />
              )}
              {isCompanyUser && progress === 5 && <CompletedCompanyRegister />}
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
