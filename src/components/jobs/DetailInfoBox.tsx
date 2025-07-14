import {
  Briefcase,
  Building2,
  Clock,
  Contact,
  DollarSign,
  GraduationCap,
  MapPin,
  UsersRound,
} from 'lucide-react';

import Button from '../common/button/Button';
import ScrapButton from '../recruitment/ScrapButton';
import styles from './detailInfoBox.module.scss';

interface DetailRecruitResponse {
  id: number;
  title: string;
  companyName: string;
  description: string;
  location: string;
  employmentType: string;
  salary: string;
  career: string;
  published: string;
  grade: string;
  isScrapped: boolean;
  expiryAt: string;
}

const DetailInfoBox = ({
  id,
  title,
  companyName,
  location,
  employmentType,
  salary,
  career,
  grade,
  isScrapped,
  expiryAt,
}: DetailRecruitResponse) => {
  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.recruitInfoBox}>
          <div className={styles.title}>{title}</div>
          <div className={styles.recruitInfo}>
            <div className={styles.firstFloor}>
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
                {employmentType}
              </div>
              <div>
                <Building2 width={15} />
                {companyName}
              </div>
            </div>
            <div className={styles.secondFloor}>
              <div>
                <Contact width={15} />
                {career}
              </div>
              <div>
                <GraduationCap width={15} />
                {grade}
              </div>
              <div>
                <DollarSign width={15} />
                {salary}
              </div>
              <div>
                <Clock width={15} />
                {expiryAt}
              </div>
            </div>
          </div>
        </div>
        <img src='/' alt='채용공고 이미지' />
      </div>

      <div className={styles.buttons}>
        <ScrapButton id={id} initial={isScrapped} />

        <Button>기업 정보 보러가기</Button>
      </div>
    </div>
  );
};

export default DetailInfoBox;
