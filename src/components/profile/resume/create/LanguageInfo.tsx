import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './languageInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import SelectField from '@/components/common/field/SelectField';

const language = {
  language: '',
  proficiency: '',
};

const proficiencyOptions = [
  { value: 'BASIC', label: '기초' },
  { value: 'INTERMEDIATE', label: '중급' },
  { value: 'ADVANCED', label: '상급' },
  { value: 'FLUENT', label: '원어민 수준' },
];

export default function LanguageInfo() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>언어</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(language)}
        >
          <Plus className={styles.plusIcon} />
          언어 추가
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>언어 능력을 추가해주세요</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.itemWrapper}>
          <div className={styles.itemHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.itemContent}>
            <InputField
              control={control}
              name={`languages.${index}.language`}
              label='언어'
              placeholder='언어명을 입력하세요'
              required={true}
              maxLength={20}
            />
            <SelectField
              control={control}
              name={`languages.${index}.proficiency`}
              label='능숙도'
              options={proficiencyOptions}
              required={true}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
