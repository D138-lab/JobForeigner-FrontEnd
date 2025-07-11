import AnnualHiresChart from '@/components/companies/AnnualHiresChart';
import SalaryBox from '@/components/companies/SalaryBox';
import styles from './salaryInfo.module.scss';

interface SalaryInfoProps {
  averageSalary: number;
  monthlySalary: number;
}

const SalaryInfo = ({ averageSalary, monthlySalary }: SalaryInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.salaryBoxContainer}>
        <SalaryBox titleText='전체 연봉' value={averageSalary} scale='만원' />
        <SalaryBox titleText='월 실수령액' value={monthlySalary} scale='원' />
      </div>
      <div className={styles.chartContainer}>
        <AnnualHiresChart />
      </div>
    </div>
  );
};

export default SalaryInfo;
