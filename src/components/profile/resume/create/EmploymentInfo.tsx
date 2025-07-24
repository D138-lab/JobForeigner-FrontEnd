import Button from '@/components/common/button/Button';
import styles from './employmentInfo.module.scss';
import { Plus, Trash } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import InputField from '@/components/common/field/InputField';
import TextareaField from '@/components/common/field/TextareaField';

const employment = {
  companyName: '',
  departmentName: '',
  jobTitle: '',
  startDate: '',
  endDate: '',
  achievement: '',
};

export default function EmploymentInfo() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employments',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>경력</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(employment)}
        >
          <Plus className={styles.plusIcon} />
          경력 추가
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>경력 정보를 추가해주세요</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.employmentWrapper}>
          <div className={styles.employmentHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.employmentContent}>
            <div className={styles.nameAndSpot}>
              <InputField
                control={control}
                name={`employments.${index}.companyName`}
                label='회사명'
                placeholder='회사명을 입력하세요'
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`employments.${index}.departmentName`}
                label='부서명'
                placeholder='부서명을 입력하세요'
                required={true}
                maxLength={30}
              />
            </div>
            <InputField
              control={control}
              name={`employments.${index}.jobTitle`}
              label='직위'
              placeholder='직위를 입력하세요'
              required={true}
              maxLength={30}
            />
            <div className={styles.nameAndSpot}>
              <InputField
                control={control}
                name={`employments.${index}.startDate`}
                label='입사일'
                placeholder='YYYY-MM-DD'
                required={true}
                type='date'
              />
              <InputField
                control={control}
                name={`employments.${index}.endDate`}
                label='퇴사일'
                placeholder='YYYY-MM-DD'
                required={true}
                type='date'
              />
            </div>
            <TextareaField
              control={control}
              name={`employments.${index}.achievement`}
              label='주요 성과'
              placeholder='주요 성과를 입력하세요'
              maxLength={2000}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
