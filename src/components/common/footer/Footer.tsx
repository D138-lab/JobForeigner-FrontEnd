import { Link, useNavigate } from 'react-router-dom';
import styles from './footer.module.scss';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.links}>
          <Link to='/'>광고문의</Link>
          <Link to='/'>제휴문의</Link>
        </div>
        <div className={styles.info}>
          <div>
            고객센터 : 054-578-0000 (평일 09:00 - 18:00) | Fax : 054-578-0000 |
            Email : anten@kumoh.ac.kr
          </div>
          <div>
            대표 :{' '}
            <button type='button' onClick={() => navigate('/admin')}>
              안형태
            </button>{' '}
            | 사업자등록번호 : 01-13-12923-401 | 주소 : 경상북도 구미시 대학로
            61 D139
          </div>
        </div>

        <div className={styles.bottomRow}>© JobForeigner LLC. All rights reserved.</div>
      </div>
    </footer>
  );
}
