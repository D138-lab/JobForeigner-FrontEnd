import styles from './applyTab.module.scss';
import { useNavigate } from 'react-router-dom';

type ApplyProps = {
  recruitId: number;
  expiryAt: Date;
};

const ApplyTab = ({ recruitId, expiryAt }: ApplyProps) => {
  const navigate = useNavigate();
  const handleApply = () => {
    navigate('/select-resume', { state: { recruitId } });
  };

  const now = new Date();
  const expiry = new Date(expiryAt);
  const diffMins = expiry.getTime() - now.getTime();
  const dDay = Math.ceil(diffMins / (1000 * 60 * 60 * 24));
  const getTitle = () => {
    if (dDay < 0) return '마감된 공고입니다.';
    if (dDay >= 100) return '신중하게 고민해보세요!';
    if (dDay >= 30) return '이제 슬슬 준비해볼까요?';
    return '지금이 바로 기회입니다!';
  };

  const getSubtitle = () => {
    if (dDay < 0) return '지원이 마감된 공고입니다. 다음 기회를 기다려주세요.';
    if (dDay >= 100) return '아직 여유는 있지만 미리 준비하면 좋겠죠?';
    if (dDay >= 30) return '마감일까지 한 달 남았어요. 여유 있게 준비해봐요!';
    return '마감이 임박했어요. 서두르시는 게 좋겠어요!';
  };

  return (
    <div className={styles.container}>
      <div className={styles.deadline}>
        <div className={styles.duedate}>D-{dDay}</div>
        <div className={styles.text}>
          <div>{getTitle()}</div>
          <div>{getSubtitle()}</div>
        </div>
      </div>
      {dDay >= 0 && (
        <div className={styles.applyBtn} onClick={handleApply}>
          지원하기
        </div>
      )}
    </div>
  );
};

export default ApplyTab;
