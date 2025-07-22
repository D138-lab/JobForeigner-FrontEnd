import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './linkInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import URLInputField from '@/components/common/field/URLInputField';

const link = {
  title: '',
  url: '',
};

export default function LinkInfo() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>첨부 파일 및 링크</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(link)}
        >
          <Plus className={styles.plusIcon} />
          링크 추가
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>
          포트폴리오, 블로그, GitHub 등의 링크를 추가해주세요
        </p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.linkWrapper}>
          <div className={styles.linkHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.linkContent}>
            <InputField
              control={control}
              name={`links.${index}.title`}
              label='제목'
              placeholder='에: 포트폴리오, 블로그, github'
              required={true}
              maxLength={50}
            />
            <URLInputField
              control={control}
              name={`links.${index}.url`}
              label='URL'
              placeholder='https://'
              required={true}
              maxLength={1000}
              type='url'
            />
          </div>
        </div>
      ))}
    </div>
  );
}
