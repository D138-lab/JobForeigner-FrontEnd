import Card from '@/components/common/card/Card';
import styles from './applicationInfo.module.scss';
import { Application } from '@/lib/type/profile/application';
import { Ban, Building2, Calendar, ChevronRight, FileText } from 'lucide-react';
import clsx from 'clsx';
import Button from '@/components/common/button/Button';
import { useTranslation } from 'react-i18next';

const parseStatus = (status: string, t: (key: string) => string) => {
  if (status === 'reviewing') {
    return t('profile.applications.statusSummary.reviewing');
  }
  if (status === 'interview') {
    return t('profile.applications.statusSummary.interview');
  }
  if (status === 'accepted') {
    return t('profile.component.applicationInfo.hired');
  }
  if (status === 'rejected') {
    return t('profile.companyApplications.status.rejected');
  }
  return status;
};

interface ApplicationInfoProps {
  application: Application;
  icon: React.ReactNode;
}

export default function ApplicationInfo({
  application,
  icon,
}: ApplicationInfoProps) {
  const { t } = useTranslation('pages');
  return (
    <Card>
      <div className={styles.applicationInfo}>
        <div className={styles.applicationInfoHeader}>
          <div className={styles.applicationInfoImage}>
            <img src={application.logo} alt={application.company} />
          </div>
          <div className={styles.applicationInfoHeaderText}>
            <h3 className={styles.applicationInfoHeaderTitle}>
              {application.title}
            </h3>
            <p className={styles.applicationInfoHeaderCompany}>
              {application.company}
            </p>
            <p className={styles.applicationInfoHeaderDescription}>
              <span>
                <Building2 />
                {application.location}
              </span>
              <span>•</span>
              <span className='flex items-center'>
                <Calendar className='w-3 h-3 mr-1' />
                {t('profile.component.common.appliedAt', {
                  date: application.appliedAt,
                })}
              </span>
              <span>•</span>
              <span className='flex items-center'>
                <FileText className='w-3 h-3 mr-1' />
                {application.resumeTitle}
              </span>
            </p>
          </div>
          <div className={styles.applicationInfoStatus}>
            <div className={clsx(styles.tag, styles[application.status])}>
              {icon}
              <span>{parseStatus(application.status, t)}</span>
            </div>
          </div>
        </div>
        <hr className={styles.applicationInfoDivider} />
        <div className={styles.applicationInfoActions}>
          <Button variant='outline' size='small'>
            <div className={clsx(styles.buttonItem, styles.cancel)}>
              <Ban />
              {t('profile.component.applicationInfo.cancel')}
            </div>
          </Button>
          <Button size='small'>
            <div className={clsx(styles.buttonItem, styles.detail)}>
              {t('profile.component.common.detail')}
              <ChevronRight />
            </div>
          </Button>
        </div>
      </div>
    </Card>
  );
}
