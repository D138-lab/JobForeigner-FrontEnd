import { Job } from '@/lib/type/profile/bookmark';
import styles from './scrapedRecruitmentCard.module.scss';
import {
  Ban,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  ExternalLink,
  MapPin,
  MoreVertical,
  Share2,
  Trash2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/button/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  job: Job;
  onRemoveBookmark: (jobId: number) => void;
}

export default function ScrapedRecruitmentCard({
  job,
  onRemoveBookmark,
}: Props) {
  const { t } = useTranslation('pages');
  const daysLeft = Math.ceil(
    (new Date(job.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
  );

  const getStatusBadge = () => {
    if (job.status === 'active') {
      return daysLeft <= 3 ? (
        <span className={`${styles.badge} ${styles.badgeSoon}`}>
          <Clock className={styles.metaIcon} />{' '}
          {t('profile.component.scrapedRecruitmentCard.closingIn', {
            days: daysLeft,
          })}
        </span>
      ) : (
        <span className={`${styles.badge} ${styles.badgeActive}`}>
          <Clock className={styles.metaIcon} />{' '}
          {t('profile.bookmark.jobs.status.active')}
        </span>
      );
    }
    return (
      <span className={`${styles.badge} ${styles.badgeExpired}`}>
        <Ban className={styles.metaIcon} />{' '}
        {t('profile.bookmark.jobs.status.expired')}
      </span>
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardLeft}>
          <div className={styles.logoWrapper}>
            <img
              src={job.company.logo}
              alt={job.company.name}
              className={styles.logo}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.titleRow}>
              <h3 className={styles.title}>{job.title}</h3>
              {getStatusBadge()}
            </div>
            <p className={styles.companyName}>{job.company.name}</p>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <MapPin className={styles.metaIcon} /> {job.location}
              </span>
              <span>•</span>
              <span className={styles.metaItem}>
                <Briefcase className={styles.metaIcon} /> {job.employmentType}
              </span>
              <span>•</span>
              <span className={styles.metaItem}>
                <Calendar className={styles.metaIcon} /> ~{job.expiresAt}
              </span>
            </div>
            <div className={styles.buttonGroup}>
              <Link to={`/jobs/${job.id}`}>
                <Button variant='outline'>
                  {t('profile.component.common.viewPostDetail')}
                </Button>
              </Link>
              {job.status === 'active' && (
                <Link to={`/jobs/${job.id}/apply`}>
                  <Button>{t('jobsSelectResume.apply')}</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={styles.cardRight}>
          <div className={styles.dropdown}>
            <button type='button' className={styles.iconButton}>
              <MoreVertical />
            </button>
            <div className={styles.dropdownContent}>
              <Link to={`/jobs/${job.id}`} className={styles.dropdownItem}>
                <ExternalLink className={styles.dropdownIcon} />{' '}
                {t('profile.component.scrapedRecruitmentCard.goPostPage')}
              </Link>
              <Link
                to={`/companies/${job.company.id}`}
                className={styles.dropdownItem}
              >
                <Building2 className={styles.dropdownIcon} />{' '}
                {t('profile.component.likedCompanyCard.companyInfo')}
              </Link>
              <button type='button' className={styles.dropdownItem}>
                <Share2 className={styles.dropdownIcon} />{' '}
                {t('profile.component.common.share')}
              </button>
              <button
                type='button'
                className={`${styles.dropdownItem} ${styles.delete}`}
                onClick={() => onRemoveBookmark(job.id)}
              >
                <Trash2 className={styles.dropdownIcon} />{' '}
                {t('profile.component.scrapedRecruitmentCard.deleteScrap')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
