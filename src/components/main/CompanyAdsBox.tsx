import styles from './companyAdsBox.module.scss';

export interface CompanyAd {
  adImg: string;
  title: string;
  companyName: string;
  companyType: string;
}

type Props = {
  data: CompanyAd[];
};

const CompanyAdsBox = ({ data }: Props) => {
  return (
    <div className={styles.container}>
      {data.map((d, idx) => (
        <div
          key={`${d.companyName}-${d.title}-${idx}`}
          className={styles.companyAdBox}
        >
          <div className={styles.imageWrap}>
            <img src={d.adImg} alt={d.companyName} />
            <span className={styles.companyType}>{d.companyType}</span>
          </div>
          <div className={styles.infos}>
            <div className={styles.title}>{d.title}</div>
            <div className={styles.companyName}>{d.companyName}</div>
            <div className={styles.actionRow}>
              <span className={styles.actionText}>브랜드 스토리 보기</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompanyAdsBox;
