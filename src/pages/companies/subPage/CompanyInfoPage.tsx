import styles from './companyInfoPage.module.scss';
import { Building2, Globe, MapPin, Users } from 'lucide-react';
import { useMemo } from 'react';
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
  const { t, i18n } = useTranslation('pages');
  const formattedEmployeeCount = useMemo(
    () => new Intl.NumberFormat(i18n.language).format(numOfEmployee),
    [i18n.language, numOfEmployee],
  );
  const introParagraphs = useMemo(
    () => description.split('\n').filter(Boolean),
    [description],
  );
  const benefitItems = useMemo(
    () => benefits.split('\n').filter(Boolean),
    [benefits],
  );

  return (
    <div className={styles.container}>
      <div className={styles.overviewGrid}>
        <div className={styles.infoCard}>
          <div className={styles.headText}>{t('companies.info.sectionTitle')}</div>
          <div className={styles.infoList}>
            <div className={styles.infoRow}>
              <div className={styles.iconWrap}>
                <Building2 size={18} />
              </div>
              <div className={styles.content}>
                <span>{t('companies.info.type')}</span>
                <span>{companyType}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.iconWrap}>
                <Users size={18} />
              </div>
              <div className={styles.content}>
                <span>{t('companies.info.employee')}</span>
                <span>{formattedEmployeeCount}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.iconWrap}>
                <MapPin size={18} />
              </div>
              <div className={styles.content}>
                <span>{t('companies.info.address')}</span>
                <span>{companyAddress}</span>
              </div>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.iconWrap}>
                <Globe size={18} />
              </div>
              <div className={styles.content}>
                <span>{t('companies.info.homepage')}</span>
                <span>
                  {homepageUrl ? (
                    <a
                      className={styles.link}
                      href={homepageUrl}
                      target='_blank'
                      rel='noreferrer'
                    >
                      {homepageUrl}
                    </a>
                  ) : (
                    '-'
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contentCard}>
          <div className={styles.headText}>{t('companies.info.intro')}</div>
          <div className={styles.bodyText}>
            {(introParagraphs.length > 0 ? introParagraphs : ['-']).map(item => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>

        <div className={styles.contentCard}>
          <div className={styles.headText}>{t('companies.info.benefits')}</div>
          <div className={styles.benefitList}>
            {(benefitItems.length > 0 ? benefitItems : ['-']).map(item => (
              <div className={styles.benefitItem} key={item}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyInfoPage;
