import styles from './companyInfoPage.module.scss';
import { Building2, Users, MapPin, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

type Props = {
  companyName: string;
  numOfEmployee: number;
  companyAddress: string;
  companyType: string;
  homepageUrl: string;
  description: string;
  benefits: string;
};

const CompanyInfoPage = ({
  numOfEmployee,
  companyAddress,
  companyType,
  homepageUrl,
  description,
  benefits,
}: Props) => {
  const { t } = useTranslation('pages');

  return (
    <div className={styles.container}>
      <div className={styles.contentArea}>
        <div className={styles.companyInfoSection}>
          <div className={styles.contentSection}>
            <div className={styles.headText}>{t('companies.info.sectionTitle')}</div>
            <div className={styles.companyType}>
              <Building2 />
              <div className={styles.content}>
                <span>{t('companies.info.type')}</span>
                <span>{companyType}</span>
              </div>
            </div>
            <div className={styles.companyEmployee}>
              <Users />
              <div className={styles.content}>
                <span>{t('companies.info.employee')}</span>
                <span>{numOfEmployee}</span>
              </div>
            </div>
            <div className={styles.companyLocation}>
              <MapPin />
              <div className={styles.content}>
                <span>{t('companies.info.address')}</span>
                <span>{companyAddress}</span>
              </div>
            </div>
            <div className={styles.homePage}>
              <Globe />
              <div className={styles.content}>
                <span>{t('companies.info.homepage')}</span>
                <span>
                  <a className={styles.link} href={homepageUrl}>
                    {homepageUrl}
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.companyDescriptionSection}>
          <div className={styles.headText}>{t('companies.info.intro')}</div>
          <div>{description}</div>
        </div>
        <div className={styles.companyBenefitsSection}>
          <div className={styles.headText}>{t('companies.info.benefits')}</div>
          <div>{benefits}</div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
