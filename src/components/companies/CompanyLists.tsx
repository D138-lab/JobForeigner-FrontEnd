import {
  CompanyType,
  GetAllCompanyInfoResponse,
} from '@/lib/apis/queries/useGetCompanyApis';
import { useEffect, useState } from 'react';

import CompanyCard from './CompanyCard';
import { Link } from 'react-router-dom';
import styles from './companyList.module.scss';

type Props = {
  data: GetAllCompanyInfoResponse | undefined;
};

const CompanyLists = ({ data }: Props) => {
  const [companies, setCompanies] = useState<CompanyType[]>();
  if (!data) return <div>데이터 없음</div>;

  useEffect(() => {
    if (data) {
      console.log(data.pageContents);
      setCompanies(data.pageContents);
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
              companyId={ele.companyId}
              companyType='기본타입'
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CompanyLists;
