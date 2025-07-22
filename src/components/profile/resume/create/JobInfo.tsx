import styles from './jobInfo.module.scss';
import Input from '@/components/common/input/Input';
import Button from '@/components/common/button/Button';
import { useFormContext } from 'react-hook-form';
import { useRef, useState } from 'react';
import JobTag from './JobTag';

export default function JobInfo() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { watch, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState('');
  const jobs = watch('jobs') || [];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddJob = () => {
    if (!inputValue.trim()) return;
    if (jobs.includes(inputValue.trim())) {
      setInputValue('');
      return;
    }
    setValue('jobs', [...jobs, inputValue.trim()]);
    setInputValue('');
    inputRef.current?.focus();
  };

  const handleRemoveJob = (index: number) => {
    const newJobs = [...jobs];
    newJobs.splice(index, 1);
    setValue('jobs', newJobs);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>희망 직종</h2>
      <div className={styles.content}>
        <Input
          ref={inputRef}
          placeholder='희망 직종을 입력하세요'
          name='jobsInput'
          onChange={onChange}
          value={inputValue}
        />
        <Button type='button' size='medium' onClick={handleAddJob}>
          추가
        </Button>
      </div>
      <div className={styles.jobsList}>
        {jobs.map((job: string, index: number) => (
          <JobTag key={job} handleRemoveJob={() => handleRemoveJob(index)}>
            {job}
          </JobTag>
        ))}
      </div>
    </div>
  );
}
