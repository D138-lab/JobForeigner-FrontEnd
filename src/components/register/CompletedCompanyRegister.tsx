import Button from '../common/button/Button';
import { CircleCheck } from 'lucide-react';
import styles from './completedCompanyRegister.module.scss';
import { useNavigate } from 'react-router-dom';

const CompletedCompanyRegister = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <CircleCheck size={60} color='green' />
      <h2>기업 계정이 생성되었습니다.</h2>
      <div className={styles.generatedIdBox}>
        <div className={styles.label}>자동 생성된 기업 사용자 ID</div>
        <div className={styles.id}>ID : AD21DAS</div>
      </div>
      <div className={styles.alert}>
        <span>관리자 승인이 완료될때까지 로그인이 제한됩니다.</span>
        <span>승인 여부는 메일함을 확인해주시기 바랍니다.</span>
      </div>
      <Button size='medium' type='button' onClick={() => navigate('/')}>
        홈으로 돌아가기
      </Button>
    </div>
  );
};

export default CompletedCompanyRegister;
