import { useFormContext } from 'react-hook-form';
import styles from './jobPreferenceInfo.module.scss';
import InputField from '@/components/common/field/InputField';
import SelectField from '@/components/common/field/SelectField';

const employmentTypeOptions = [
  { value: 'FULL_TIME', label: '정규직' },
  { value: 'CONTRACT', label: '계약직' },
  { value: 'INTERN', label: '인턴' },
  { value: 'ANY', label: '무관' },
];

export default function JobPreferenceInfo() {
  const { control } = useFormContext();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>희망 근무 조건</h2>
      <div className={styles.content}>
        <div className={styles.row}>
          <SelectField
            control={control}
            name='employmentType'
            label='고용 형태'
            options={employmentTypeOptions}
            required={false}
          />
          <InputField
            control={control}
            name='desiredSalary'
            label='희망 연봉 (만원 단위)'
            placeholder='희망 연봉 (만원 단위)'
            required={false}
            type='number'
            min={0}
          />
        </div>
        <InputField
          control={control}
          name='workLocation'
          label='희망 근무지역'
          placeholder='예: 서울시 강남구'
          required={false}
        />
      </div>
    </div>
  );
}
