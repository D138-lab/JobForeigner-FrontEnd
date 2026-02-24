import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import Button from '../common/button/Button';
import UploadForm from '../common/uploadForm/UploadForm';
import styles from './companyFourthSection.module.scss';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import usePostCompanyUserSignup from '@/lib/apis/mutations/usePostCompanyUserSignup';
import { RegisterValues } from '@/lib/schemas/registerSchema';

interface Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const CompanyFourthSection = ({ setProgress }: Props) => {
  const { handleSubmit, getValues } = useFormContext<RegisterValues>();
  const signup = usePostCompanyUserSignup();
  const navigate = useNavigate();
  let id = 0;
  void id;

  const onClickPrevious = () => setProgress(3);

  const onSubmit = () => {
    const values = getValues();
    const { passwordConfirm, ...registerInfo } = values;

    signup.mutate(registerInfo, {
      onSuccess: response => {
        navigate('/');
        console.log(response.data.id);
        id = response.data.id;
      },
      onError: err => console.error('회원가입 실패:', err),
    });

    console.log('제출된 값:', registerInfo);
  };

  return (
    <div className={styles.container}>
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
