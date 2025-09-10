import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/lib/constants';
import { useEffect } from 'react';
import Card from '@/components/common/card/Card';
import { FormProvider } from 'react-hook-form';
import styles from './page.module.scss';
import { useForm } from 'react-hook-form';
import { Mail, RefreshCw } from 'lucide-react';
import Button from '@/components/common/button/Button';
import VerifyCodeInputField from '@/components/verifyEmail/VerifyCodeInputField';

const defaultValues = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
};

export default function VerifyEmailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;
  const formState = useForm({ defaultValues });

  const onSubmit = (data: unknown) => {
    console.log(data);
  };

  const onError = (error: unknown) => {
    console.error(error);
  };

  // useEffect(() => {
  //   if (!email) {
  //     navigate(PATH.INDEX, { replace: true });
  //   }
  // }, [email]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>JobForeigner</h1>
        <h2>이메일 인증</h2>
        <p>회원가입을 완료하기 위해 이메일 인증이 필요합니다.</p>
        <Card>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              <div className={styles.formHeader}>
                <div className={styles.mailIconContainer}>
                  <Mail className={styles.mailIcon} />
                </div>
                <h2 className={styles.formHeaderTitle}>
                  인증 코드를 입력하세요
                </h2>
                <div className={styles.formHeaderDescription}>
                  <span className={styles.email}>이메일: {email}</span>
                  <span className={styles.description}>
                    위 이메일로 전송된 6자리 인증코드를 입력해주세요.
                  </span>
                </div>
              </div>
              <div className={styles.formContent}>
                {/* 에러 메시지를 보여주는 곳 */}
                <div className={styles.inputContainer}>
                  <VerifyCodeInputField />
                </div>
                <div className={styles.resendMail}>
                  <p>인증 코드를 받지 못하셨나요?</p>
                  <Button variant='ghost'>
                    <span className={styles.resendMailText}>
                      <RefreshCw />
                      인증 코드 재전송
                    </span>
                  </Button>
                </div>
                <Button size='medium'>
                  <span className={styles.submitButton}>인증하기</span>
                </Button>
              </div>
              <div className={styles.cardFooter}>
                <p>이메일이 도착하지 않았다면 스팸 메일함을 확인해주세요.</p>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
