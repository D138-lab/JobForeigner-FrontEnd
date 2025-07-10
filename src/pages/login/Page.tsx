import { Link, useNavigate } from 'react-router-dom';
import styles from './page.module.scss';
import { FormProvider, useForm } from 'react-hook-form';
import Card from '@/components/common/card/Card';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginValues } from '@/lib/schemas/loginSchema';
import LoginSection from '@/components/login/LoginSection';
import usePostSignin from '@/lib/apis/mutations/usePostSignin';

const defaultValues = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate, error, isPending, isError } = usePostSignin();
  const formState = useForm({
    defaultValues,
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginValues) => {
    mutate(data);
    console.log(`로그인 시도: ${data.email} Error: ${error}`);

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
        <h2>로그인</h2>
        <p>
          아직 계정이 없으신가요? <Link to='/register'>회원가입</Link>
        </p>
        <Card>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              <LoginSection isPending={isPending} />
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
