import { Building2, Globe, MapPin, UserRound, Users } from 'lucide-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { CompanyType } from '@/lib/apis/queries/useGetCompanyApis';
import styles from './companyCard.module.scss';

interface Props extends CompanyType {
  category?: string;
  ceoName?: string;
  homepageUrl?: string;
  isTranslating?: boolean;
}

const CompanyCard = ({
  imageUrl,
  companyName,
  description,
  address,
  employeeCount,
  category,
  ceoName,
  homepageUrl,
  isTranslating = false,
}: Props) => {
  const { t, i18n } = useTranslation('pages');
  const formattedEmployeeCount = useMemo(
    () => new Intl.NumberFormat(i18n.language).format(employeeCount),
    [employeeCount, i18n.language],
  );
  const regionLabel = useMemo(() => {
    const primaryAddress = address.split(' ').filter(Boolean).slice(0, 2);
    return primaryAddress.join(' ');
  }, [address]);
  const homepageLabel = useMemo(() => {
    if (!homepageUrl) return null;

    try {
      return new URL(homepageUrl).hostname.replace(/^www\./, '');
    } catch {
      return homepageUrl;
    }
  }, [homepageUrl]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logoWrapper}>
          <img src={imageUrl} alt={companyName} className={styles.logo} />
        </div>
        <div className={styles.headerContent}>
          <div className={styles.badges}>
            {isTranslating ? (
              <div className={styles.translationStatus}>번역 중...</div>
            ) : null}
            {category ? <div className={styles.categoryBadge}>{category}</div> : null}
          </div>
          <div className={styles.companyName}>{companyName}</div>
          <div className={styles.subMeta}>
            {regionLabel ? (
              <span className={styles.subMetaItem}>
                <MapPin size={14} />
                {regionLabel}
              </span>
            ) : null}
            <span className={styles.subMetaItem}>
              <Users size={14} />
              {t('companies.info.employee')} {formattedEmployeeCount}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.description}>{description}</div>

      <div className={styles.detailGrid}>
        <div className={styles.detailItem}>
          <Building2 size={16} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>{t('companies.info.address')}</span>
            <span className={styles.detailValue}>{address}</span>
          </div>
        </div>
        <div className={styles.detailItem}>
          <UserRound size={16} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>CEO</span>
            <span className={styles.detailValue}>{ceoName || '-'}</span>
          </div>
        </div>
        <div className={styles.detailItem}>
          <Globe size={16} />
          <div className={styles.detailContent}>
            <span className={styles.detailLabel}>{t('companies.info.homepage')}</span>
            <span className={styles.detailValue}>{homepageLabel || '-'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
