import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import styles from './firstSection.module.scss';
import InputField from '../common/field/InputField';
import { useFormContext } from 'react-hook-form';
import Button from '../common/button/Button';
import { ChevronRight } from 'lucide-react';

interface Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

export default function FirstSection({ setProgress }: Props) {
  const { control, trigger, watch } = useFormContext();

  const email = watch('email');
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const onClickNext = async () => {
    const isValid = await trigger(['email', 'password', 'passwordConfirm']);

    if (isValid && email && password && passwordConfirm) {
      setProgress(2);
    }
  };

  return (
    <div className={styles.container}>
      <h2>계정 정보</h2>
      <InputField
        control={control}
        name='email'
        label='이메일'
        placeholder='이메일을 입력해주세요.'
        required={true}
      />
      <InputField
        control={control}
        name='password'
        label='비밀번호'
        type='password'
        placeholder='비밀번호를 입력해주세요.'
        required={true}
      />
      <InputField
        control={control}
        name='passwordConfirm'
        label='비밀번호 확인'
        type='password'
        placeholder='비밀번호를 다시 입력해주세요.'
        required={true}
      />
      <div className={styles.actions}>
        <Button type='button' onClick={onClickNext}>
          다음
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
