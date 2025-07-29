import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

import Button from '../common/button/Button';
import UploadForm from '../common/uploadForm/UploadForm';
import styles from './companyFourthSection.module.scss';

interface Props {
  setProgress: Dispatch<SetStateAction<number>>;
}

const CompanyFourthSection = ({ setProgress }: Props) => {
  const onClickPrevious = () => {
    setProgress(3);
  };

  const onClickNext = async () => {
    setProgress(5);
  };

  return (
    <div className={styles.container}>
      <h2>서류 업로드</h2>
      <div className={styles.subtitle}>
        <span>사업자등록증</span>
        <span style={{ color: 'red' }}>*</span>
      </div>
      <UploadForm />
      <div className={styles.actions}>
        <Button type='button' variant='outline' onClick={onClickPrevious}>
          <ChevronLeft />
          이전
        </Button>
        <Button type='button' onClick={onClickNext}>
          다음
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default CompanyFourthSection;
