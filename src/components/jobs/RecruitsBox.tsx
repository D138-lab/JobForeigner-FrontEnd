import { GetRecruitsResponse } from '@/lib/apis/queries/useGetRecruits';
import { getTranslatedJobPost } from '@/lib/apis/queries/useGetTranslatedJobPost';
import { resolveTranslationLanguage } from '@/lib/utils/translation';
import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import RecruitBox from './RecruitBox';
import styles from './recruitsBox.module.scss';

type Props = {
  data: GetRecruitsResponse;
};

const RecruitsBox = ({ data }: Props) => {
  const { i18n } = useTranslation();
  const translationLanguage = resolveTranslationLanguage(i18n.language);
  const translationQueries = useQueries({
    queries: data.pageContents.map(recruit => ({
      queryKey: [
        'useGetTranslatedJobPost',
        recruit.id,
        translationLanguage ?? '',
      ] as [string, number, string],
      queryFn: getTranslatedJobPost,
      enabled: !!translationLanguage,
      staleTime: 1000 * 60 * 60 * 24,
    })),
  });
  const translatedRecruitMap = useMemo(
    () =>
      new Map(
        data.pageContents.map((recruit, index) => [
          recruit.id,
          translationQueries[index]?.data?.data,
        ]),
      ),
    [data.pageContents, translationQueries],
  );
  const translationPendingMap = useMemo(
    () =>
      new Map(
        data.pageContents.map((recruit, index) => [
          recruit.id,
          !!translationLanguage &&
            !!translationQueries[index] &&
            translationQueries[index].isFetching &&
            !translationQueries[index].data,
        ]),
      ),
    [data.pageContents, translationLanguage, translationQueries],
  );

  return (
    <div className={styles.container}>
      {data.pageContents.map(recruit => {
        const translatedRecruit = translatedRecruitMap.get(recruit.id);

        return (
          <RecruitBox
            key={recruit.id}
            {...recruit}
            originalRegionType={recruit.regionType}
            originalEmploymentType={recruit.employmentType}
            title={translatedRecruit?.title ?? recruit.title}
            description={translatedRecruit?.description ?? recruit.description}
            regionType={translatedRecruit?.regionType ?? recruit.regionType}
            employmentType={
              translatedRecruit?.employmentType ?? recruit.employmentType
            }
            salary={translatedRecruit?.salary ?? recruit.salary}
            career={translatedRecruit?.career ?? recruit.career}
            grade={translatedRecruit?.grade ?? recruit.grade}
            companyName={translatedRecruit?.companyName ?? recruit.companyName}
            isTranslating={translationPendingMap.get(recruit.id) ?? false}
          />
        );
      })}
    </div>
  );
};

export default RecruitsBox;
