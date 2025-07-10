import { useFormContext } from 'react-hook-form';
import styles from './loginSection.module.scss';
import InputField from '../common/field/InputField';
import Button from '../common/button/Button';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface Props {
  isPending: boolean;
}

export default function LoginSection({ isPending }: Props) {
  const { control } = useFormContext();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);

    setTimeout(() => {
      if (passwordRef.current) {
        passwordRef.current.focus();
        const length = passwordRef.current.value.length;
        passwordRef.current.setSelectionRange(length, length);
      }
    }, 0);
  };

  return (
    <div className={styles.container}>
      <InputField
        control={control}
        name='email'
        label='이메일'
        placeholder='이메일을 입력해주세요.'
        icon='email'
      />
      <div className={styles.searchPasswordLink}>
        <Link to='/login'>비밀번호 찾기</Link>
      </div>
      <InputField
        control={control}
        name='password'
        label='비밀번호'
        type={isPasswordVisible ? 'text' : 'password'}
        placeholder='비밀번호를 입력해주세요.'
        icon='password'
        ref={passwordRef}
      />
      {isPasswordVisible ? (
        <Eye
          className={styles.passwordIcon}
          onClick={togglePasswordVisibility}
        />
      ) : (
        <EyeOff
          className={styles.passwordIcon}
          onClick={togglePasswordVisibility}
        />
      )}
      <div className={styles.buttonContainer}>
        <Button type='submit' size='medium' disabled={isPending}>
          로그인
        </Button>
      </div>
    </div>
  );
}
