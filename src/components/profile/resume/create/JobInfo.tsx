import styles from './jobInfo.module.scss';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { useFormContext } from 'react-hook-form';
import { useRef, useState } from 'react';
import JobTag from './JobTag';
import { useTranslation } from 'react-i18next';

export default function JobInfo() {
  const { t } = useTranslation('pages');
  const inputRef = useRef<HTMLInputElement>(null);
  const { watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const desiredJobs = watch('desiredJobs') || [];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddJob = () => {
    if (!inputValue.trim()) return;
    if (desiredJobs.some((j: any) => j.desiredJob === inputValue.trim())) {
      setInputValue('');
      return;
    }
    setValue('desiredJobs', [
      ...desiredJobs,
      { desiredJob: inputValue.trim() },
    ]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleRemoveJob = (index: number) => {
    const newJobs = [...desiredJobs];
    newJobs.splice(index, 1);
    setValue('desiredJobs', newJobs);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t('profile.resumePreview.sections.desiredJobs')}</h2>
      <div className={styles.content}>
        <Input
          ref={inputRef}
          placeholder={t('profile.component.jobInfo.placeholder')}
          name='jobsInput'
          onChange={onChange}
          value={inputValue}
        />
        <Button type='button' size='medium' onClick={handleAddJob}>
          {t('profile.component.common.add')}
        </Button>
      </div>
      <div className={styles.jobsList}>
        {desiredJobs.map((job: { desiredJob: string }, index: number) => (
          <JobTag
            key={job.desiredJob}
            handleRemoveJob={() => handleRemoveJob(index)}
          >
            {job.desiredJob}
          </JobTag>
        ))}
      </div>
    </div>
  );
}
