const isKoreanLanguage = (language?: string) =>
  (language ?? '').toLowerCase().startsWith('ko');

export const getEmploymentTypeLabel = (
  employmentType: string,
  language?: string,
) => {
  const labels: Record<string, { ko: string; default: string }> = {
    ALL: { ko: '전체', default: 'All' },
    FULL_TIME: { ko: '정규직', default: 'Full-time' },
    CONTRACT: { ko: '계약직', default: 'Contract' },
    INTERN: { ko: '인턴', default: 'Intern' },
    ETC: { ko: '기타', default: 'Other' },
  };

  const entry = labels[employmentType.toUpperCase()];
  if (!entry) return employmentType;

  return isKoreanLanguage(language) ? entry.ko : entry.default;
};

export const getRegionLabel = (region: string, language?: string): string => {
  const labels: Record<string, { ko: string; default: string }> = {
    ALL: { ko: '전체', default: 'All' },
    SEOUL: { ko: '서울', default: 'Seoul' },
    BUSAN: { ko: '부산', default: 'Busan' },
    DAEGU: { ko: '대구', default: 'Daegu' },
    INCHEON: { ko: '인천', default: 'Incheon' },
    GWANGJU: { ko: '광주', default: 'Gwangju' },
    DAEJEON: { ko: '대전', default: 'Daejeon' },
    ULSAN: { ko: '울산', default: 'Ulsan' },
    SEJONG: { ko: '세종', default: 'Sejong' },
    GYEONGGI: { ko: '경기', default: 'Gyeonggi' },
    GANGWON: { ko: '강원', default: 'Gangwon' },
    CHUNGBUK: { ko: '충북', default: 'Chungbuk' },
    CHUNGNAM: { ko: '충남', default: 'Chungnam' },
    JEONBUK: { ko: '전북', default: 'Jeonbuk' },
    JEONNAM: { ko: '전남', default: 'Jeonnam' },
    GYEONGBUK: { ko: '경북', default: 'Gyeongbuk' },
    GYEONGNAM: { ko: '경남', default: 'Gyeongnam' },
    JEJU: { ko: '제주', default: 'Jeju' },
  };

  const entry = labels[region.toUpperCase()];
  if (!entry) return region;

  return isKoreanLanguage(language) ? entry.ko : entry.default;
};

export const formatJobExpiryLabel = (expiryAt: string, language?: string) => {
  const expiryDate = new Date(expiryAt);
  if (Number.isNaN(expiryDate.getTime())) return '';

  if (isKoreanLanguage(language)) {
    return `${expiryDate.getMonth() + 1}.${expiryDate.getDate()} 마감`;
  }

  return `Closes ${expiryDate.getMonth() + 1}/${expiryDate.getDate()}`;
};

export const translateJobMetaText = (value: string, language?: string) => {
  if (isKoreanLanguage(language)) return value;

  return value
    .replace(/경력 무관/g, 'No experience required')
    .replace(/신입/g, 'Entry level')
    .replace(/학력 무관/g, 'No education requirement')
    .replace(/고졸 이상/g, 'High school diploma or higher')
    .replace(/대졸 이상/g, "Bachelor's degree or higher")
    .replace(/석사 이상/g, "Master's degree or higher")
    .replace(/박사 이상/g, 'Doctoral degree or higher')
    .replace(/월\s*([0-9.,]+)만원/g, 'Monthly KRW $1 ten-thousand')
    .replace(/연\s*([0-9.,]+)만원/g, 'Annual KRW $1 ten-thousand')
    .replace(/연봉\s*([0-9.,]+)만원/g, 'Annual KRW $1 ten-thousand')
    .replace(/시급\s*([0-9,]+)원/g, 'Hourly KRW $1')
    .replace(/일급\s*([0-9,]+)원/g, 'Daily KRW $1')
    .replace(/(\d+)년 이상/g, '$1+ years')
    .replace(/(\d+)년 이하/g, 'Up to $1 years');
};
