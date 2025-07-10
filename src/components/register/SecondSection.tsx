import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import styles from './secondSection.module.scss';
import InputField from '../common/field/InputField';
import { useFormContext } from 'react-hook-form';
import Button from '../common/button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import RadioField from '../common/field/RadioField';

export const genderValues = [
  [
    {
      label: '남성',
      value: 'male',
    },
    {
      label: '여성',
      value: 'female',
    },
  ],
];

interface Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

export default function SecondSection({ setProgress }: Props) {
  const { control, trigger, watch } = useFormContext();

  const name = watch('name');
  const username = watch('username');
  const gender = watch('gender');
  const phoneNumber = watch('phoneNumber');

  const onClickPrevious = () => {
    setProgress(1);
  };

  const onClickNext = async () => {
    const isValid = await trigger([
      'name',
      'username',
      'gender',
      'phoneNumber',
    ]);

    if (isValid && name && username && gender && phoneNumber) {
      setProgress(3);
    }
  };

  return (
    <div className={styles.container}>
      <h2>기본 정보</h2>
      <InputField
        control={control}
        name='name'
        label='이름'
        placeholder='이름을 입력해주세요.'
        required={true}
      />
      <InputField
        control={control}
        name='username'
        label='닉네임'
        placeholder='닉네임을 입력해주세요.'
        required={true}
      />
      <RadioField
        control={control}
        name='gender'
        label='성별'
        required={true}
        options={genderValues}
      />
      <InputField
        control={control}
        name='phoneNumber'
        label='전화번호'
        type='phone'
        placeholder='전화번호를 입력해주세요.'
        required={true}
      />
      <div className={styles.actions}>
        <Button type='button' variant='outline' onClick={onClickPrevious}>
          <ChevronLeft />
          이전
        </Button>
        <Button type='button' onClick={onClickNext}>
          다음
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
