import { Link, useLocation, useNavigate } from 'react-router-dom';

import ResumeBox from '@/components/jobs/ResumeBox';
import styles from './selectResume.module.scss';
import useGetResumeList from '@/lib/apis/queries/useGetResumeList';
import usePostApplyRecruit from '@/lib/apis/mutations/usePostApplyRecruit';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const SelectResume = () => {
  const { t } = useTranslation('pages');
  const { data, isPending, isError, error } = useGetResumeList();
  const { mutate } = usePostApplyRecruit();
  const locate = useLocation();
  const [selected, setSelected] = useState<number>(0);
  const navigator = useNavigate();
  const jobPostId = locate.state.recruitId;

  if (isPending) return <div>{t('jobsSelectResume.pending')}</div>;
  if (isError) return <div>{error.message}</div>;
  console.log('이력서 : ', data);

  const handleSelected = (id: number) => {
    setSelected(id);
  };

  const handleApply = (id: number) => {
    mutate({ jobPostId: jobPostId, resumeId: id });
    navigator('/apply-success', { state: { id: id } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('jobsSelectResume.title')}</div>
      <div className={styles.subtitle}>{t('jobsSelectResume.subtitle')}</div>
      <div className={styles.resumeLists}>
        {data.data!.content.map(resume => (
          <ResumeBox
            selected={selected === resume.resumeId}
            {...resume}
            key={resume.resumeId}
            onClick={() => handleSelected(resume.resumeId)}
          />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.createResumeBtn}>
          <Link to='/create-resume'>{t('jobsSelectResume.createResume')}</Link>
        </div>
        <div className={styles.apply} onClick={() => handleApply(selected)}>
          {t('jobsSelectResume.apply')}
        </div>
      </div>
    </div>
  );
};

export default SelectResume;
