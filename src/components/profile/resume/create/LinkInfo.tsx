import { useFieldArray, useFormContext } from 'react-hook-form';
import styles from './linkInfo.module.scss';
import Button from '@/components/common/button/Button';
import { Plus, Trash } from 'lucide-react';
import InputField from '@/components/common/field/InputField';
import URLInputField from '@/components/common/field/URLInputField';
import { useTranslation } from 'react-i18next';

const link = {
  title: '',
  url: '',
};

export default function LinkInfo() {
  const { t } = useTranslation('pages');
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'links',
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {t('profile.resumePreview.sections.attachments')}
        </h2>
        <Button
          type='button'
          variant='outline'
          size='medium'
          onClick={() => append(link)}
        >
          <Plus className={styles.plusIcon} />
          {t('profile.component.link.add')}
        </Button>
      </div>
      {!fields.length ? (
        <p className={styles.appendText}>
          {t('profile.component.link.append')}
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
              label={t('communityWrite.labels.title')}
              placeholder={t('profile.component.link.titlePlaceholder')}
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
