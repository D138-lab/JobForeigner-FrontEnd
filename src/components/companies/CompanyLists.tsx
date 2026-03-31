import {
  CompanyType,
  GetAllCompanyInfoResponse,
} from '@/lib/apis/queries/useGetCompanyApis';
import { getTranslatedCompany } from '@/lib/apis/queries/useGetTranslatedCompany';
import { resolveTranslationLanguage } from '@/lib/utils/translation';
import { useEffect, useMemo, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import CompanyCard from './CompanyCard';
import { Link } from 'react-router-dom';
import styles from './companyList.module.scss';

type Props = {
  data: GetAllCompanyInfoResponse | undefined;
};

const CompanyLists = ({ data }: Props) => {
  const { i18n } = useTranslation();
  const [companies, setCompanies] = useState<CompanyType[]>();
  if (!data) return <div>데이터 없음</div>;

  useEffect(() => {
    if (data) {
      setCompanies(data.pageContents);
    }
  }, [data]);

  const translationLanguage = resolveTranslationLanguage(i18n.language);
  const translationQueries = useQueries({
    queries: (companies ?? []).map(company => ({
      queryKey: [
        'useGetTranslatedCompany',
        company.companyId,
        translationLanguage ?? '',
      ] as [string, number, string],
      queryFn: getTranslatedCompany,
      enabled: !!translationLanguage,
      staleTime: 1000 * 60 * 60 * 24,
    })),
  });
  const translatedCompaniesMap = useMemo(
    () =>
      new Map(
        (companies ?? []).map((company, index) => [
          company.companyId,
          translationQueries[index]?.data?.data.companyInfoDto,
        ]),
      ),
    [companies, translationQueries],
  );
  const translationPendingMap = useMemo(
    () =>
      new Map(
        (companies ?? []).map((company, index) => [
          company.companyId,
          !!translationLanguage &&
            !!translationQueries[index] &&
            translationQueries[index].isFetching &&
            !translationQueries[index].data,
        ]),
      ),
    [companies, translationLanguage, translationQueries],
  );

  return (
    <div className={styles.container}>
      {companies?.map(ele => (
        <Link
          to={`/companies/${ele.companyId}`}
          key={ele.companyId}
          state={ele.companyId}
        >
          <CompanyCard
            key={ele.companyId}
            {...ele}
            companyName={
              translatedCompaniesMap.get(ele.companyId)?.companyName ??
              ele.companyName
            }
            description={
              translatedCompaniesMap.get(ele.companyId)?.description ??
              ele.description
            }
            category={translatedCompaniesMap.get(ele.companyId)?.category}
            ceoName={translatedCompaniesMap.get(ele.companyId)?.ceoName}
            homepageUrl={translatedCompaniesMap.get(ele.companyId)?.url}
            isTranslating={translationPendingMap.get(ele.companyId) ?? false}
          />
        </Link>
      ))}
    </div>
  );
};

export default CompanyLists;
