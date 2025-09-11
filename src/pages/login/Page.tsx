import { FormProvider, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { LoginValues } from '@/lib/schemas/loginSchema';

import Card from '@/components/common/card/Card';
import LoginSection from '@/components/login/LoginSection';
import styles from './page.module.scss';
import { useAuth } from '@/lib/hooks/auth/useAuth';
import { ParseErrorMsg } from '@/lib/utils/parse';
import { useState } from 'react';

const defaultValues = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const formState = useForm({
    defaultValues,
  });
  const [error, setError] = useState<string | null>(null);

  const { loginAndFetchUser } = useAuth();

  const onSubmit = async (data: LoginValues) => {
    try {
      await loginAndFetchUser(data);
      navigate('/');
    } catch (err) {
      const error = ParseErrorMsg(err);
      setError(error);
    }
  };

  const onError = (error: unknown) => {
    const parsedError = ParseErrorMsg(error);
    console.error(parsedError);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>JobForeigner</h1>
        <h2>로그인</h2>
        <p>
          아직 계정이 없으신가요? <Link to='/register'>회원가입</Link>
        </p>
        <Card>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              <LoginSection
                error={error}
                isPending={formState.formState.isSubmitting}
              />
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
