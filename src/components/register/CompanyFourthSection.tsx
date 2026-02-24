import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';

import Button from '../common/button/Button';
import UploadForm from '../common/uploadForm/UploadForm';
import styles from './companyFourthSection.module.scss';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import usePostCompanyUserSignup from '@/lib/apis/mutations/usePostCompanyUserSignup';
import { RegisterValues } from '@/lib/schemas/registerSchema';
import { ParseErrorMsg } from '@/lib/utils/parse';

interface Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const CompanyFourthSection = ({ setProgress }: Props) => {
  const { handleSubmit, getValues } = useFormContext<RegisterValues>();
  const signup = usePostCompanyUserSignup();
  const navigate = useNavigate();
  let id = 0;
  void id;
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onClickPrevious = () => setProgress(3);

  const onSubmit = () => {
    const values = getValues();
    const { passwordConfirm, ...registerInfo } = values;

    signup.mutate(registerInfo, {
      onSuccess: response => {
        console.log(response.data.id);
        id = response.data.id;
        setErrorMessage(null);
        setSuccessMessage(
          '담당자가 승인하면 메일로 알려드릴게요!\n승인까지 시간이 조금 걸릴 수 있어요.',
        );
      },
      onError: err => {
        console.error('회원가입 실패:', err);
        try {
          const { msg } = ParseErrorMsg(err);
          setErrorMessage(msg);
        } catch {
          setErrorMessage('회원가입 중 오류가 발생했습니다.');
        }
      },
    });

    console.log('제출된 값:', registerInfo);
  };

  return (
    <div className={styles.container}>
      {successMessage && (
        <div className={styles.errorModalOverlay}>
          <div className={styles.errorModal}>
            <div className={styles.errorTitle}>회원가입 완료</div>
            <div className={styles.errorMessage}>{successMessage}</div>
            <Button
              type='button'
              variant='outline'
              onClick={() => {
                setSuccessMessage(null);
                navigate('/');
              }}
            >
              확인
            </Button>
          </div>
        </div>
      )}
      {errorMessage && (
        <div className={styles.errorModalOverlay}>
          <div className={styles.errorModal}>
            <div className={styles.errorTitle}>회원가입 오류</div>
            <div className={styles.errorMessage}>{errorMessage}</div>
            <Button
              type='button'
              variant='outline'
              onClick={() => setErrorMessage(null)}
            >
              닫기
            </Button>
          </div>
        </div>
      )}
      <h2>서류 업로드</h2>
      <div className={styles.subtitle}>
        <span>사업자등록증</span>
        <span style={{ color: 'red' }}>*</span>
      </div>
      <UploadForm />
      <div className={styles.actions}>
        <Button type='button' variant='outline' onClick={onClickPrevious}>
          <ChevronLeft />
          이전
        </Button>
        <Button type='button' onClick={handleSubmit(onSubmit)}>
          다음
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CompanyFourthSection;
