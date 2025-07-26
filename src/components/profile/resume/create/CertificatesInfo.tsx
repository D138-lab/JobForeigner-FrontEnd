import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './certificatesInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';

const certificate = {
  name: '',
  organization: '',
  date: '',
  number: '',
};

export default function CertificatesInfo() {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certificates',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>자격증</h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(certificate)}
        >
          <Plus className={styles.plusIcon} />
          자격증 추가
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>자격증 정보를 추가해주세요</p>
      ) : null}
      {fields.map((field, index) => (
        <div key={field.id} className={styles.certificateWrapper}>
          <div className={styles.certificateHeader}>
            <Trash className={styles.trashIcon} onClick={() => remove(index)} />
          </div>
          <div className={styles.certificateContent}>
            <div className={styles.nameAndOrganization}>
              <InputField
                control={control}
                name={`certificates.${index}.name`}
                label='자격증명'
                placeholder='자격증명을 입력하세요'
                required={true}
                maxLength={30}
              />
              <InputField
                control={control}
                name={`certificates.${index}.organization`}
                label='발급 기관'
                placeholder='발급 기관을 입력하세요'
                required={true}
                maxLength={30}
              />
            </div>
            <div className={styles.dateAndNumber}>
              <InputField
                control={control}
                name={`certificates.${index}.date`}
                label='취득일'
                placeholder='예: 2022.05'
                required={true}
                maxLength={30}
              />
              {/* <InputField
                control={control}
                name={`certificates.${index}.number`}
                label='자격증 번호'
                placeholder='자격증 번호를 입력하세요'
                required={true}
                maxLength={30}
              /> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
