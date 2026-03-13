import { BriefcaseBusiness, Building2, ChevronRight, MapPin, Users } from 'lucide-react';
import styles from './searchResultForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface JobPost {
  id: number;
  title: string;
  companyName: string;
  description: string;
  location: string;
  employment_type: string;
  salary: string;
  career: string;
  published: string;
  expiryAt: string;
  grade: string;
  isScrapped: boolean;
  imageList: string[];
}

interface ContentProp {
  companyId: number;
  companyName: string;
  companyDescription: string;
  companyAddress: string;
  employeeCount: number;
  jobPostList: JobPost[];
}

interface Props {
  content: ContentProp[];
}

const SearchResultForm = ({ content }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation('common');

  return (
    <div className={styles.container}>
      {content.map(ele => (
        <button
          type='button'
          key={ele.companyId}
          className={styles.companyCard}
          onClick={() =>
            navigate(`/companies/${ele.companyId}`, {
              state: ele.companyId,
            })
          }
        >
          <div className={styles.cardTop}>
            <div className={styles.companyBlock}>
              <div className={styles.companyIcon}>
                <Building2 size={16} />
              </div>
              <div className={styles.companyText}>
                <strong>{ele.companyName}</strong>
                <p>{ele.companyDescription}</p>
              </div>
            </div>
            <ChevronRight size={16} className={styles.chevron} />
          </div>
          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <MapPin size={14} />
              {ele.companyAddress}
            </span>
            <span className={styles.metaItem}>
              <Users size={14} />
              {t('employees', { count: ele.employeeCount })}
            </span>
            <span className={styles.metaItem}>
              <BriefcaseBusiness size={14} />
              {t('openJobs', { count: ele.jobPostList.length })}
            </span>
          </div>
        </button>
      ))}
    </div>
  );
};

export default SearchResultForm;
