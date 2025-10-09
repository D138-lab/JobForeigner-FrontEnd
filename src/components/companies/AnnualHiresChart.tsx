import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import styles from './annualHiresChart.module.scss';

const data = [
  { year: '2020년', hires: 30, resignations: 50 },
  { year: '2021년', hires: 45, resignations: 60 },
  { year: '2022년', hires: 55, resignations: 65 },
  { year: '2023년', hires: 70, resignations: 60 },
  { year: '2024년', hires: 80, resignations: 75 },
];

const AnnualHiresChart = () => {
  return (
    <div className={styles.container}>
      <h2>최근 연도별 입·퇴사자</h2>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          barCategoryGap='30%'
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='year' />
          <YAxis domain={[0, 'dataMax + 20']} />
          <Tooltip />
          <Legend />
          <Bar dataKey='resignations' fill='#d3d3d3' name='퇴사자' />
          <Bar dataKey='hires' fill='#0c4a6e' name='입사자' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnnualHiresChart;
