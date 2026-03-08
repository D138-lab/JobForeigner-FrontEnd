import {
  Ban,
  Building2,
  Calendar,
  Clock,
  Eye,
  PenSquare,
  Trash2,
  Users,
} from 'lucide-react';
import styles from './recruitmentCard.module.scss';
import Button from '@/components/common/button/Button';
import { CompanyRecruitmentCard } from '@/lib/type/company/company';
import { useTranslation } from 'react-i18next';

const StatusTag = ({
  status,
  t,
}: {
  status: string;
  t: (key: string) => string;
}) => {
  const getIcon = (status: string) => {
    if (status === 'active') {
      return <Clock />;
    }
    if (status === 'expired') {
      return <Ban />;
    }
    return null;
  };

  const parseStatus = (status: string) => {
    if (status === 'active') {
      return t('profile.companyRecruitment.status.active');
    }
    if (status === 'expired') {
      return t('profile.companyRecruitment.status.expired');
    }
    return status;
  };

  const getColor = (status: string) => {
    if (status === 'active') {
      return 'var(--color-blue-800)';
    }
    if (status === 'expired') {
      return 'var(--color-red-800)';
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
  recruitment: CompanyRecruitmentCard;
}

export default function RecruitmentCard({ recruitment }: Props) {
  const { t } = useTranslation('pages');
  return (
    <div className={styles.recruitment}>
      <div className={styles.title}>
        <div className={styles.left}>
          <h2>{recruitment.title}</h2>
          <div>
            <StatusTag status={recruitment.status} t={t} />
          </div>
        </div>
        <Trash2 className={styles.deleteIcon} />
      </div>
      <div className={styles.subTitle}>
        <Building2 />
        {recruitment.location} • {recruitment.employmentType}
      </div>
      <div className={styles.info}>
        <div>
          <Calendar />{' '}
          {t('profile.component.recruitmentCard.createdAt', {
            date: recruitment.createdAt,
          })}
        </div>
        <div>
          <Calendar />{' '}
          {t('profile.component.recruitmentCard.expiresAt', {
            date: recruitment.expiresAt,
          })}
        </div>
        <div>
          <Users />{' '}
          {t('profile.component.recruitmentCard.applicants', {
            count: recruitment.applicantsCount,
          })}
        </div>
        <div>
          <Eye />{' '}
          {t('profile.component.recruitmentCard.views', {
            count: recruitment.viewCount,
          })}
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.actions}>
        <Button variant='outline' size='medium'>
          <span className={styles.buttonContent}>
            <Eye />
            {t('profile.component.recruitmentCard.viewPost')}
          </span>
        </Button>
        <Button variant='outline' size='medium'>
          <span className={styles.buttonContent}>
            <PenSquare />
            {t('profile.component.common.edit')}
          </span>
        </Button>
        <Button size='medium'>
          <span className={styles.buttonContent}>
            <Users />
            {t('profile.component.recruitmentCard.viewApplicants', {
              count: recruitment.applicantsCount,
            })}
          </span>
        </Button>
      </div>
    </div>
  );
}
