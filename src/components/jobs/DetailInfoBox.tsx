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
import { formatPublished } from '@/lib/utils/formatPublished';
import styles from './detailInfoBox.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface DetailRecruitResponse {
  id: number;
  title: string;
  companyId: number;
  companyName: string;
  description: string;
  regionType?: string;
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
  companyId,
  companyName,
  regionType,
  location,
  employmentType,
  salary,
  career,
  published,
  grade,
  isScrapped,
  expiryAt,
}: DetailRecruitResponse) => {
  const { t, i18n } = useTranslation('pages');
  const navigate = useNavigate();
  const dueDate = new Date(expiryAt);
  const now = new Date();
  const diffTime = dueDate.getTime() - now.getTime();
  const dDay = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const publishedLabel = formatPublished(published, i18n.language, t);
  const displayRegion = regionType || location;

  return (
    <div className={styles.container}>
      <div className={styles.topBox}>
        <div className={styles.recruitInfoBox}>
          <div className={styles.badgeRow}>
            <div className={styles.companyBadge}>{companyName}</div>
            <div className={styles.published}>{publishedLabel}</div>
          </div>
          <div className={styles.title}>{title}</div>
          <div className={styles.recruitInfo}>
            <div className={styles.firstFloor}>
              <div>
                <MapPin width={15} />
                {displayRegion}
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
                <UsersRound width={15} />
                1000+
              </div>
              <div>
                <Clock width={15} />
                {`D-${dDay}`}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.logoBox}>
          <Building2 />
        </div>
      </div>

      <div className={styles.buttons}>
        <ScrapButton id={id} initial={isScrapped} />

        <Button
          variant='outline'
          size='medium'
          onClick={() => navigate(`/companies/${companyId}`)}
        >
          기업 정보 보러가기
        </Button>
      </div>
    </div>
  );
};

export default DetailInfoBox;
