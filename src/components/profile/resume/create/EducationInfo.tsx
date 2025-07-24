import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './educationInfo.module.scss';
import { Trash } from 'lucide-react';
import Button from '@/components/common/button/Button';
import { Plus } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import SelectField from '@/components/common/field/SelectField';

const degreeOptions = [
  { value: 'BACHELOR', label: '학사' },
  { value: 'MASTER', label: '석사' },
  { value: 'DOCTOR', label: '박사' },
];

const graduationStatusOptions = [
  { value: 'GRADUATED', label: '졸업' },
  { value: 'COMPLETED', label: '수료' },
  { value: 'STUDYING', label: '재학 중' },
];

const defaultEducation = {
  educationName: '',
  major: '',
  yearOfGraduation: '',
  degree: '',
  graduationStatus: '',
  etc: '',
};

export default function EducationInfo() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'educations',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>학력</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(defaultEducation)}
        >
          <Plus className={styles.plusIcon} />
          학력 추가
        </Button>
      </div>

      {!fields.length && (
        <p className={styles.appendText}>학력 정보를 추가해주세요</p>
      )}

      {fields.map((field, index) => (
        <div key={field.id} className={styles.educationWrapper}>
          <div className={styles.educationHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.educationContent}>
            <div className={styles.educationAndMajor}>
              <InputField
                control={control}
                name={`educations.${index}.educationName`}
                label='학교명'
                placeholder='학교명을 입력하세요'
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`educations.${index}.major`}
                label='전공'
                placeholder='전공을 입력하세요'
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`educations.${index}.yearOfGraduation`}
                label='졸업 연도'
                placeholder='예: 2025-02-28'
                required={true}
              />
            </div>
            <div className={styles.educationAndMajor}>
              <SelectField
                control={control}
                name={`educations.${index}.degree`}
                label='학위'
                required={true}
                options={degreeOptions}
              />
              <SelectField
                control={control}
                name={`educations.${index}.graduationStatus`}
                label='졸업 상태'
                required={true}
                options={graduationStatusOptions}
              />
            </div>

            <InputField
              control={control}
              name={`educations.${index}.etc`}
              label='기타'
              placeholder='학점, 활동 등 추가 정보'
              required={false}
              maxLength={2000}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
