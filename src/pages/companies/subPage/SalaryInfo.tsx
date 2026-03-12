import AnnualHiresChart from '@/components/companies/AnnualHiresChart';
import SalaryBox from '@/components/companies/SalaryBox';
import styles from './salaryInfo.module.scss';
import { useTranslation } from 'react-i18next';

interface SalaryInfoProps {
  averageSalary: number;
  monthlySalary: number;
}

const SalaryInfo = ({ averageSalary, monthlySalary }: SalaryInfoProps) => {
  const { t } = useTranslation('pages');

  return (
    <div className={styles.container}>
      <div className={styles.salaryBoxContainer}>
        <SalaryBox
          titleText={t('companies.salary.total')}
          value={averageSalary}
          scale={t('companies.salary.unitManwon')}
        />
        <SalaryBox
          titleText={t('companies.salary.monthly')}
          value={monthlySalary}
          scale={t('companies.salary.unitWon')}
        />
      </div>
      <div className={styles.chartContainer}>
        <AnnualHiresChart />
      </div>
    </div>
  );
};

export default SalaryInfo;
