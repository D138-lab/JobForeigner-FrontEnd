import {
  Globe,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Users,
  FileText,
  User,
} from 'lucide-react';
import styles from './companyInfo.module.scss';
import { CompanyProfileInfo } from '@/lib/type/company/company';
import { useTranslation } from 'react-i18next';

interface Props {
  companyData: CompanyProfileInfo;
}

export default function CompanyInfo({ companyData }: Props) {
  const { t } = useTranslation('pages');
  return (
    <>
      <div className={styles.topSection}>
        <div className={styles.logoContainer}>
          <div className={styles.logoWrapper}>
            <img
              src={companyData.logo || '/placeholder.svg'}
              alt={companyData.name}
              className={styles.logoImage}
            />
          </div>
        </div>

        <div className={styles.companyInfo}>
          <div>
            <h2 className={styles.companyName}>{companyData.name}</h2>
            <span className={styles.companyIndustry}>
              {companyData.industry}
            </span>
          </div>

          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <User className={styles.icon} />
              <div>
                <span className={styles.infoTitle}>
                  {t('profile.component.companyInfo.ceo')}
                </span>
                <span className={styles.infoContent}>{companyData.ceo}</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <FileText className={styles.icon} />
              <div>
                <span className={styles.infoTitle}>
                  {t('profile.component.companyInfo.businessNumber')}
                </span>
                <span className={styles.infoContent}>
                  {companyData.businessNumber}
                </span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Calendar className={styles.icon} />
              <div>
                <span className={styles.infoTitle}>
                  {t('profile.component.companyInfo.foundedYear')}
                </span>
                <span className={styles.infoContent}>
                  {t('profile.component.companyInfo.foundedYearValue', {
                    year: companyData.foundedYear,
                  })}
                </span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <Users className={styles.icon} />
              <div>
                <span className={styles.infoTitle}>
                  {t('profile.component.companyInfo.employeeCount')}
                </span>
                <span className={styles.infoContent}>
                  {companyData.employeeCount}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contactSection}>
        <div className={styles.contactItem}>
          <MapPin className={styles.icon} />
          <div>
            <span className={styles.contactTitle}>
              {t('profile.resumePreview.fields.address')}
            </span>
            <span className={styles.contactContent}>{companyData.address}</span>
          </div>
        </div>

        <div className={styles.contactItem}>
          <Phone className={styles.icon} />
          <div>
            <span className={styles.contactTitle}>
              {t('profile.component.companyInfo.contact')}
            </span>
            <span className={styles.contactContent}>{companyData.phone}</span>
          </div>
        </div>

        <div className={styles.contactItem}>
          <Mail className={styles.icon} />
          <div>
            <span className={styles.contactTitle}>
              {t('profile.resumePreview.fields.email')}
            </span>
            <span className={styles.contactContent}>{companyData.email}</span>
          </div>
        </div>

        <div className={styles.contactItem}>
          <Globe className={styles.icon} />
          <div>
            <span className={styles.contactTitle}>
              {t('profile.component.companyInfo.website')}
            </span>
            <a
              href={companyData.website}
              target='_blank'
              rel='noopener noreferrer'
              className={styles.websiteLink}
            >
              {companyData.website}
            </a>
          </div>
        </div>
      </div>

      <div className={styles.descriptionSection}>
        <span className={styles.descriptionTitle}>
          {t('profile.component.companyInfo.intro')}
        </span>
        <span className={styles.descriptionContent}>
          {companyData.description}
        </span>
      </div>
    </>
  );
}
