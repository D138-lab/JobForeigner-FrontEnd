import { useEffect, useState } from 'react';

import CompanyCard from './CompanyCard';
import { Link } from 'react-router-dom';
import styles from './companyList.module.scss';
import { useGetAllCompanyInfo } from '@/lib/apis/mutations/useCompanyApis';

export type CompanyType = {
  address: string;
  companyId: number;
  companyImg?: string;
  companyType?: string;
  companyName: string;
  description: string;
  employeeCount: number;
};

const CompanyLists = () => {
  const { data, isLoading, isError, error } = useGetAllCompanyInfo();

  if (isLoading) console.log('로딩 중');
  if (isError) console.log('에러 발생', error);
  const [companies, setCompanies] = useState<CompanyType[]>();

  useEffect(() => {
    if (data) {
      console.log(data.data.pageContents);
      setCompanies(data.data.pageContents);
    }
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>검색된 기업</div>
      <div className={styles.companyList}>
        {companies?.map(ele => (
          <Link
            to={`/companies/${ele.companyId}`}
            key={ele.companyId}
            state={ele.companyId}
          >
            <CompanyCard
              key={ele.companyId}
              {...ele}
              companyImg=''
              companyType='기본타입'
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyLists;
