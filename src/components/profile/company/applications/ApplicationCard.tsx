import {
  Briefcase,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  Mail,
  Phone,
  XCircle,
} from 'lucide-react';
import styles from './applicationCard.module.scss';
import Button from '@/components/common/button/Button';
import { Link } from 'react-router-dom';
import { CompanyApplicationCard } from '@/lib/type/company/company';
import { useTranslation } from 'react-i18next';

const StatusTag = (status: string, t: (key: string) => string) => {
  const getIcon = (status: string) => {
    if (status === 'reviewing') {
      return <Clock />;
    }
    if (status === 'interview') {
      return <Calendar />;
    }
    if (status === 'rejected') {
      return <XCircle />;
    }
    if (status === 'accepted') {
      return <CheckCircle2 />;
    }
    return null;
  };

  const parseStatus = (status: string) => {
    if (status === 'reviewing') {
      return t('profile.companyApplications.status.reviewing');
    }
    if (status === 'interview') {
      return t('profile.companyApplications.status.interview');
    }
    if (status === 'rejected') {
      return t('profile.companyApplications.status.rejected');
    }
    if (status === 'accepted') {
      return t('profile.companyApplications.status.accepted');
    }
    return status;
  };

  const getColor = (status: string) => {
    if (status === 'reviewing') {
      return 'var(--color-blue-800)';
    }
    if (status === 'interview') {
      return 'var(--color-green-800)';
    }
    if (status === 'rejected') {
      return 'var(--color-red-800)';
    }
    if (status === 'accepted') {
      return 'var(--color-green-800)';
    }
    return '';
  };

  return (
    <div
      className={styles.statusTag}
      style={{
        color: getColor(status),
        backgroundColor: getColor(status).replace('800', '100'),
      }}
    >
      {getIcon(status)}
      {parseStatus(status)}
    </div>
  );
};

interface Props {
  application: CompanyApplicationCard;
}

export default function ApplicationCard({ application }: Props) {
  const { t } = useTranslation('pages');
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <div className={styles.recruitmentTitle}>
            <span>{t('profile.component.applicationCard.recruitment')}</span>
            <h3>{application.jobTitle}</h3>
          </div>
          <div className={styles.subTitle}>
            <span>
              <Briefcase />
              {`${application.jobInfo.position}(${application.jobInfo.department})`}
            </span>
            <span>
              <Building2 />
              {application.jobInfo.employmentType}
            </span>
            <span>
              <Calendar />
              {t('profile.component.recruitmentCard.expiresAt', {
                date: application.jobInfo.expiresAt,
              })}
            </span>
          </div>
        </div>
        <div className={styles.headerActions}>
          {/**
           * TODO: add link target.
           */}
          <Link to={`./applications/${application.id}`}>
            <Button variant='outline'>
              {t('profile.component.recruitmentCard.viewPost')}
            </Button>
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.profileImage}>
          <div className={styles.imageWrapper}>
            <img
              src={application.applicant.photo}
              alt={t('profile.component.applicationCard.profileAlt', {
                name: application.applicant.name,
              })}
            />
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.name}>
            {application.applicant.name}
            {StatusTag(application.status, t)}
          </div>
          <div className={styles.resume}>{application.resumeTitle}</div>
          <div className={styles.applicationInfo}>
            <span>
              <Calendar />
              &nbsp;
              {t('profile.component.common.appliedAt', {
                date: application.appliedAt,
              })}
            </span>
            <span>
              <Mail />
              &nbsp;{application.applicant.email}
            </span>
            <span>
              <Phone />
              &nbsp;{application.applicant.phone}
            </span>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <Button variant='outline'>
          <span>
            <Download /> {t('profile.component.applicationCard.downloadResume')}
          </span>
        </Button>
        <Link to={`./application/${application.id}`}>
          <Button>
            <span>
              <Eye /> {t('profile.component.common.detail')}
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
