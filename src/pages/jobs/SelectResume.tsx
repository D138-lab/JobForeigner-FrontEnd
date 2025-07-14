import { Link, useNavigate } from 'react-router-dom';

import ResumeBox from '@/components/jobs/ResumeBox';
import styles from './selectResume.module.scss';
import useGetResumeList from '@/lib/apis/queries/useGetResumeList';
import { useState } from 'react';

type IdType = number | null;

const SelectResume = () => {
  const { data, isPending, isError, error } = useGetResumeList();
  const [selected, setSelected] = useState<IdType>(null);
  const navigator = useNavigate();

  if (isPending) return <div>요청 중</div>;
  if (isError) return <div>{error.message}</div>;
  console.log('이력서 : ', data);

  const handleSelected = (id: IdType) => {
    setSelected(id);
  };

  const handleApply = (id: IdType) => {
    navigator('/apply-success', { state: { id: id } });
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>이력서 선택</div>
      <div className={styles.subtitle}>지원할 이력서를 선택해주세요.</div>
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
          <Link to='/create-resume'>새 이력서 작성하기</Link>
        </div>
        <div className={styles.apply} onClick={() => handleApply(selected)}>
          지원하기
        </div>
      </div>
    </div>
  );
};

export default SelectResume;
