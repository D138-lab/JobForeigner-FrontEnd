import {
  Briefcase,
  Building2,
  Clock,
  MapPin,
  Star,
  UsersRound,
} from 'lucide-react';

import Button from '../common/button/Button';
import { RecruitInfoType } from './RecruitBox';
import styles from './detailInfoBox.module.scss';

const DetailInfoBox = ({
  title,
  company,
  location,
  date,
  rate,
  recruitType,
}: RecruitInfoType) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.recruitInfoBox}>
          <div className={styles.title}>{title}</div>
          <div className={styles.recruitInfo}>
            <div>
              <MapPin width={15} />
              {location}
            </div>
            <div>
              <UsersRound width={15} />
              1000+
            </div>
            <div>
              <Briefcase width={15} />
              {recruitType}
            </div>
            <div>
              <Building2 width={15} />
              {company}
            </div>
            <div>
              <Clock width={15} />
              {date}
            </div>
          </div>
        </div>
        <div className={styles.scores}>
          <div className={styles.rate}>
            <Star className={styles.starIcon} />
            {rate}
          </div>
          <div className={styles.review}>리뷰 11</div>
        </div>
      </div>

      <div className={styles.buttons}>
        <Button>관심기업 등록</Button>
        <Button>리뷰 보기</Button>
        <Button>스크랩하기</Button>
      </div>
    </div>
  );
};

export default DetailInfoBox;
