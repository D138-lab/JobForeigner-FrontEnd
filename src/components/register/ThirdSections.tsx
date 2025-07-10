import { SetStateAction } from 'react';
import { Dispatch } from 'react';
import styles from './thirdSection.module.scss';
import { useFormContext } from 'react-hook-form';
import Button from '../common/button/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import InputField from '../common/field/InputField';

interface Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

export default function ThirdSection({ setProgress }: Props) {
  const { control, trigger, watch } = useFormContext();

  const birthDate = watch('birthDate');
  const address = watch('address');
  const detailAddress = watch('detailAddress');
  const zipcode = watch('zipcode');

  const onClickPrevious = () => {
    setProgress(2);
  };

  const onClickNext = async () => {
    const isValid = await trigger([
      'birthDate',
      'address',
      'detailAddress',
      'zipcode',
    ]);

    if (isValid && birthDate && address && detailAddress && zipcode) {
      setProgress(4);
    }
  };

  return (
    <div className={styles.container}>
      <h2>추가 정보</h2>
      <InputField
        control={control}
        name='birthDate'
        label='생년월일'
        type='date'
        required={true}
      />
      <InputField
        control={control}
        name='address'
        label='주소'
        placeholder='주소를 입력하세요.'
        required={true}
      />
      <InputField
        control={control}
        name='detailAddress'
        label='상세주소'
        placeholder='상세 주소를 입력하세요.'
        required={true}
      />
      <InputField
        control={control}
        name='zipcode'
        label='우편 번호'
        placeholder='우편 번호를 입력하세요.'
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
