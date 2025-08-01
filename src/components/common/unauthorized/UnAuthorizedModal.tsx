import Button from '../button/Button';
import { X } from 'lucide-react';
import styles from './unAuthorizedModal.module.scss';
import { useNavigate } from 'react-router-dom';

const UnAuthorizedModal = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <X size={20} color='white' />
      </div>
      <div className={styles.title}>로그인이 필요한 서비스입니다.</div>
      <div className={styles.text}>
        이 페이지에 접근하려면 로그인이 필요합니다.
      </div>
      <Button size='medium' onClick={() => navigate('/login')}>
        로그인하러 가기
      </Button>
    </div>
  );
};

export default UnAuthorizedModal;
