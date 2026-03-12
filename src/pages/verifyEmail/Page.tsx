import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '@/lib/constants';
import { useEffect, useRef, useState } from 'react';
import Card from '@/components/common/card/Card';
import { FormProvider } from 'react-hook-form';
import styles from './page.module.scss';
import { useForm } from 'react-hook-form';
import { Mail, RefreshCw } from 'lucide-react';
import Button from '@/components/common/button/Button';
import VerifyCodeInputField from '@/components/verifyEmail/VerifyCodeInputField';
import usePostSendEmailVerifyCode from '@/lib/apis/mutations/usePostSendEmailVerifyCode';
import usePostVerifyEmail from '@/lib/apis/mutations/usePostVerifyEmail';
import { ParseErrorMsg } from '@/lib/utils/parse';
import FormErrorContainer from '@/components/common/form/FormErrorContainer';
import { useTranslation } from 'react-i18next';

const defaultValues = {
  1: '',
  2: '',
  3: '',
  4: '',
  5: '',
  6: '',
};

export default function VerifyEmailPage() {
  const { t } = useTranslation('pages');
  const location = useLocation();
  const navigate = useNavigate();
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const email = location.state?.email;
  const formState = useForm({ defaultValues });
  const { mutate: reSendMutate } = usePostSendEmailVerifyCode();
  const { isPending, mutate: verifyMutate } = usePostVerifyEmail();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (data: Record<string, string>) => {
    const code = Object.values(data).join('');
    verifyMutate(
      { email, code },
      {
        onSuccess: () => {
          console.log('이메일 인증 성공');
          navigate(PATH.LOGIN, { replace: true });
        },
        onError: (error: Error) => {
          const { msg } = ParseErrorMsg(error);
          setError(msg);
        },
      },
    );
  };

  const onError = (error: unknown) => {
    const { msg } = ParseErrorMsg(error);
    console.error(msg);
  };

  const handleResend = () => {
    reSendMutate(
      { email },
      {
        onSuccess: () => {
          console.log('이메일 인증 성공');
        },
        onError: error => console.error(`인증 코드 전송 실패: ${error}`),
      },
    );
  };

  useEffect(() => {
    if (!email) {
      navigate(PATH.INDEX, { replace: true });
    }
  }, [email]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1>JobForeigner</h1>
        <h2>{t('auth.verifyEmail.title')}</h2>
        <p>{t('auth.verifyEmail.desc')}</p>
        <Card>
          <FormProvider {...formState}>
            <form onSubmit={formState.handleSubmit(onSubmit, onError)}>
              <div className={styles.formHeader}>
                <div className={styles.mailIconContainer}>
                  <Mail className={styles.mailIcon} />
                </div>
                <h2 className={styles.formHeaderTitle}>
                  {t('auth.verifyEmail.enterCode')}
                </h2>
                <div className={styles.formHeaderDescription}>
                  <span className={styles.email}>
                    {t('auth.verifyEmail.email', { email })}
                  </span>
                  <span className={styles.description}>
                    {t('auth.verifyEmail.codeGuide')}
                  </span>
                </div>
              </div>
              <div className={styles.formContent}>
                <FormErrorContainer error={error} />
                <div className={styles.inputContainer}>
                  <VerifyCodeInputField submitButtonRef={submitButtonRef} />
                </div>
                <div className={styles.resendMail}>
                  <p>{t('auth.verifyEmail.resendQuestion')}</p>
                  <Button variant='ghost' onClick={handleResend}>
                    <span className={styles.resendMailText}>
                      <RefreshCw />
                      {t('auth.verifyEmail.resend')}
                    </span>
                  </Button>
                </div>
                <Button
                  ref={submitButtonRef}
                  size='medium'
                  disabled={isPending}
                  type='submit'
                >
                  <span className={styles.submitButton}>
                    {isPending
                      ? t('auth.verifyEmail.verifying')
                      : t('auth.verifyEmail.verify')}
                  </span>
                </Button>
              </div>
              <div className={styles.cardFooter}>
                <p>{t('auth.verifyEmail.spamGuide')}</p>
              </div>
            </form>
          </FormProvider>
        </Card>
      </div>
    </div>
  );
}
