import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './expatInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';

const expat = {
  country: '',
  experience: '',
  startDate: '',
  endDate: '',
};

export default function ExpatInfo() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expats',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>해외 경험</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(expat)}
        >
          <Plus className={styles.plusIcon} />
          해외 경험 추가
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>해외 경험 정보를 추가해주세요</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.itemWrapper}>
          <div className={styles.itemHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.itemContent}>
            <div className={styles.row}>
              <InputField
                control={control}
                name={`expats.${index}.country`}
                label='국가'
                placeholder='국가명을 입력하세요'
                required={true}
                maxLength={50}
              />
              <InputField
                control={control}
                name={`expats.${index}.experience`}
                label='경험 내용'
                placeholder='경험 내용을 입력하세요'
                required={true}
                maxLength={100}
              />
            </div>
            <div className={styles.row}>
              <InputField
                control={control}
                name={`expats.${index}.startDate`}
                label='시작일'
                placeholder='YYYY-MM-DD'
                required={true}
                maxLength={10}
              />
              <InputField
                control={control}
                name={`expats.${index}.endDate`}
                label='종료일'
                placeholder='YYYY-MM-DD'
                required={true}
                maxLength={10}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
