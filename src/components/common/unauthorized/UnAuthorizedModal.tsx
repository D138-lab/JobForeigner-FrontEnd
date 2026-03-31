import Button from '../button/Button';
import { X } from 'lucide-react';
import styles from './unAuthorizedModal.module.scss';
import { useNavigate } from 'react-router-dom';

const UnAuthorizedModal = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <button
        type='button'
        className={styles.closeButton}
        onClick={() => navigate('/')}
        aria-label='홈으로 이동'
      >
        <X size={18} />
      </button>
      <div className={styles.title}>로그인이 필요한 서비스입니다.</div>
      <div className={styles.text}>
        채용공고, 기업정보, 주변 탐색, 커뮤니티 기능은 로그인 후 이용할 수 있습니다.
      </div>
      <Button
        className={styles.loginButton}
        size='medium'
        onClick={() => navigate('/login')}
      >
        로그인하러 가기
      </Button>
    </div>
  );
};

export default UnAuthorizedModal;
