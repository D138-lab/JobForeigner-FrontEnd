import {
  Bell,
  BellOff,
  Briefcase,
  Building2,
  ExternalLink,
  MapPin,
  MoreVertical,
  Trash2,
} from 'lucide-react';
import styles from './likedCompanyCard.module.scss';
import { Link } from 'react-router-dom';
import { Company } from '@/lib/type/profile/bookmark';
import Button from '@/components/common/button/Button';
import { useTranslation } from 'react-i18next';

interface Props {
  company: Company;
  onToggleNotification: (companyId: number) => void;
  onRemoveBookmark: (companyId: number) => void;
}

export default function LikedCompanyCard({
  company,
  onToggleNotification,
  onRemoveBookmark,
}: Props) {
  const { t } = useTranslation('pages');
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardLeft}>
          <div className={styles.logoWrapper}>
            <img
              src={company.logo}
              alt={company.name}
              className={styles.logo}
            />
          </div>
          <div className={styles.info}>
            <div className={styles.nameRow}>
              <h3 className={styles.name}>{company.name}</h3>
              {company.activeJobsCount > 0 && (
                <span className={styles.badge}>
                  {t('profile.component.likedCompanyCard.hiring', {
                    count: company.activeJobsCount,
                  })}
                </span>
              )}
            </div>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <Building2 className={styles.metaIcon} /> {company.industry}
              </span>
              <span>•</span>
              <span className={styles.metaItem}>
                <MapPin className={styles.metaIcon} /> {company.location}
              </span>
              <span>•</span>
              <span className={styles.metaItem}>
                <Briefcase className={styles.metaIcon} />{' '}
                {company.employeeCount}
              </span>
            </div>
            <div className={styles.buttonGroup}>
              <Link to={`/companies/${company.id}`}>
                <Button variant='outline'>
                  {t('profile.component.likedCompanyCard.companyInfo')}
                </Button>
              </Link>
              <Link to={`/companies/${company.id}/jobs`}>
                <Button variant='outline'>
                  {t('profile.component.likedCompanyCard.recruitments', {
                    count: company.activeJobsCount,
                  })}
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.cardRight}>
          <button
            type='button'
            className={styles.iconButton}
            onClick={() => onToggleNotification(company.id)}
            title={
              company.isNotificationOn
                ? t('profile.component.likedCompanyCard.notificationOff')
                : t('profile.component.likedCompanyCard.notificationOn')
            }
          >
            {company.isNotificationOn ? <Bell /> : <BellOff />}
          </button>
          <div className={styles.dropdown}>
            <button type='button' className={styles.iconButton}>
              <MoreVertical />
            </button>
            <div className={styles.dropdownContent}>
              <Link
                to={`/companies/${company.id}`}
                className={styles.dropdownItem}
              >
                <ExternalLink className={styles.dropdownIcon} />{' '}
                {t('profile.component.likedCompanyCard.goCompanyPage')}
              </Link>
              <button
                type='button'
                className={styles.dropdownItem}
                onClick={() => onToggleNotification(company.id)}
              >
                {company.isNotificationOn ? (
                  <>
                    <BellOff className={styles.dropdownIcon} />{' '}
                    {t('profile.component.likedCompanyCard.notificationOff')}
                  </>
                ) : (
                  <>
                    <Bell className={styles.dropdownIcon} />{' '}
                    {t('profile.component.likedCompanyCard.notificationOn')}
                  </>
                )}
              </button>
              <button
                type='button'
                className={`${styles.dropdownItem} ${styles.delete}`}
                onClick={() => onRemoveBookmark(company.id)}
              >
                <Trash2 className={styles.dropdownIcon} />{' '}
                {t('profile.component.likedCompanyCard.delete')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
