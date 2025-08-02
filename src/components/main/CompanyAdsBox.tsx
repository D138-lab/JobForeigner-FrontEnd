import styles from './companyAdsBox.module.scss';

export interface CompanyAd {
  adImg: string;
  companyName: string;
  companyType: string;
}

type Props = {
  data: CompanyAd[];
};

const CompanyAdsBox = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      {data.map(d => (
        <div className={styles.companyAdBox}>
          <img src={d.adImg} alt={d.companyName} />
          <div className={styles.infos}>
            <div className={styles.companyName}>{d.companyName}</div>
            <div className={styles.companyType}>{d.companyType}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyAdsBox;
