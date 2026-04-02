const isKoreanLanguage = (language?: string) =>
  (language ?? '').toLowerCase().startsWith('ko');

const normalizeLanguage = (language?: string) =>
  (language ?? '').toLowerCase().split('-')[0];

type SupportedJobMetaLanguage =
  | 'ko'
  | 'en'
  | 'vi'
  | 'zh'
  | 'th'
  | 'id'
  | 'mn'
  | 'uz'
  | 'ne'
  | 'ru'
  | 'tl';

type LocalizedLabelMap = Record<SupportedJobMetaLanguage, string>;

const getLocalizedLabel = (
  labels: LocalizedLabelMap,
  language?: string,
): string => {
  const normalizedLanguage = normalizeLanguage(language) as
    | SupportedJobMetaLanguage
    | undefined;

  if (normalizedLanguage && normalizedLanguage in labels) {
    return labels[normalizedLanguage];
  }

  return labels.en;
};

export const getEmploymentTypeLabel = (
  employmentType: string,
  language?: string,
) => {
  const labels: Record<string, LocalizedLabelMap> = {
    ALL: {
      ko: '전체',
      en: 'All',
      vi: 'Tất cả',
      zh: '全部',
      th: 'ทั้งหมด',
      id: 'Semua',
      mn: 'Бүгд',
      uz: 'Barchasi',
      ne: 'सबै',
      ru: 'Все',
      tl: 'Lahat',
    },
    FULL_TIME: {
      ko: '정규직',
      en: 'Full-time',
      vi: 'Toàn thời gian',
      zh: '全职',
      th: 'ประจำ',
      id: 'Penuh waktu',
      mn: 'Бүтэн цаг',
      uz: "To'liq stavka",
      ne: 'पूर्णकालिक',
      ru: 'Полная занятость',
      tl: 'Full-time',
    },
    CONTRACT: {
      ko: '계약직',
      en: 'Contract',
      vi: 'Hợp đồng',
      zh: '合同工',
      th: 'สัญญาจ้าง',
      id: 'Kontrak',
      mn: 'Гэрээт',
      uz: 'Shartnoma',
      ne: 'करार',
      ru: 'Контракт',
      tl: 'Kontrata',
    },
    INTERN: {
      ko: '인턴',
      en: 'Intern',
      vi: 'Thực tập',
      zh: '实习',
      th: 'ฝึกงาน',
      id: 'Magang',
      mn: 'Дадлага',
      uz: 'Amaliyot',
      ne: 'इन्टर्न',
      ru: 'Стажировка',
      tl: 'Intern',
    },
    ETC: {
      ko: '기타',
      en: 'Other',
      vi: 'Khác',
      zh: '其他',
      th: 'อื่น ๆ',
      id: 'Lainnya',
      mn: 'Бусад',
      uz: 'Boshqa',
      ne: 'अन्य',
      ru: 'Другое',
      tl: 'Iba pa',
    },
  };

  const entry = labels[employmentType.toUpperCase()];
  if (!entry) return employmentType;

  return getLocalizedLabel(entry, language);
};

export const getRegionLabel = (region: string, language?: string): string => {
  const labels: Record<string, LocalizedLabelMap> = {
    ALL: {
      ko: '전체',
      en: 'All',
      vi: 'Tất cả',
      zh: '全部',
      th: 'ทั้งหมด',
      id: 'Semua',
      mn: 'Бүгд',
      uz: 'Barchasi',
      ne: 'सबै',
      ru: 'Все',
      tl: 'Lahat',
    },
    SEOUL: {
      ko: '서울',
      en: 'Seoul',
      vi: 'Seoul',
      zh: '首尔',
      th: 'โซล',
      id: 'Seoul',
      mn: 'Сөүл',
      uz: 'Seul',
      ne: 'सियोल',
      ru: 'Сеул',
      tl: 'Seoul',
    },
    BUSAN: {
      ko: '부산',
      en: 'Busan',
      vi: 'Busan',
      zh: '釜山',
      th: 'ปูซาน',
      id: 'Busan',
      mn: 'Пусан',
      uz: 'Busan',
      ne: 'बुसान',
      ru: 'Пусан',
      tl: 'Busan',
    },
    DAEGU: {
      ko: '대구',
      en: 'Daegu',
      vi: 'Daegu',
      zh: '大邱',
      th: 'แทกู',
      id: 'Daegu',
      mn: 'Тэгү',
      uz: 'Tegu',
      ne: 'डेगू',
      ru: 'Тэгу',
      tl: 'Daegu',
    },
    INCHEON: {
      ko: '인천',
      en: 'Incheon',
      vi: 'Incheon',
      zh: '仁川',
      th: 'อินชอน',
      id: 'Incheon',
      mn: 'Инчон',
      uz: 'Incheon',
      ne: 'इन्छन',
      ru: 'Инчхон',
      tl: 'Incheon',
    },
    GWANGJU: {
      ko: '광주',
      en: 'Gwangju',
      vi: 'Gwangju',
      zh: '光州',
      th: 'กวางจู',
      id: 'Gwangju',
      mn: 'Кванжу',
      uz: 'Gvangju',
      ne: 'ग्वाङ्जू',
      ru: 'Кванджу',
      tl: 'Gwangju',
    },
    DAEJEON: {
      ko: '대전',
      en: 'Daejeon',
      vi: 'Daejeon',
      zh: '大田',
      th: 'แทจอน',
      id: 'Daejeon',
      mn: 'Тэжон',
      uz: 'Tejon',
      ne: 'डेजन',
      ru: 'Тэджон',
      tl: 'Daejeon',
    },
    ULSAN: {
      ko: '울산',
      en: 'Ulsan',
      vi: 'Ulsan',
      zh: '蔚山',
      th: 'อุลซาน',
      id: 'Ulsan',
      mn: 'Үлсан',
      uz: 'Ulsan',
      ne: 'उल्सान',
      ru: 'Ульсан',
      tl: 'Ulsan',
    },
    SEJONG: {
      ko: '세종',
      en: 'Sejong',
      vi: 'Sejong',
      zh: '世宗',
      th: 'เซจง',
      id: 'Sejong',
      mn: 'Сэжон',
      uz: 'Sejong',
      ne: 'सेजोंग',
      ru: 'Седжон',
      tl: 'Sejong',
    },
    GYEONGGI: {
      ko: '경기',
      en: 'Gyeonggi',
      vi: 'Gyeonggi',
      zh: '京畿',
      th: 'คยองกี',
      id: 'Gyeonggi',
      mn: 'Кёнги',
      uz: 'Gyeonggi',
      ne: 'ग्योन्ग्गी',
      ru: 'Кёнгидо',
      tl: 'Gyeonggi',
    },
    GANGWON: {
      ko: '강원',
      en: 'Gangwon',
      vi: 'Gangwon',
      zh: '江原',
      th: 'คังวอน',
      id: 'Gangwon',
      mn: 'Канвон',
      uz: 'Gangvon',
      ne: 'गाङ्वन',
      ru: 'Канвондо',
      tl: 'Gangwon',
    },
    CHUNGBUK: {
      ko: '충북',
      en: 'Chungbuk',
      vi: 'Chungbuk',
      zh: '忠北',
      th: 'ชุงบุก',
      id: 'Chungbuk',
      mn: 'Чүнбүк',
      uz: 'Chungbuk',
      ne: 'चुन्गबुक',
      ru: 'Чхунбук',
      tl: 'Chungbuk',
    },
    CHUNGNAM: {
      ko: '충남',
      en: 'Chungnam',
      vi: 'Chungnam',
      zh: '忠南',
      th: 'ชุงนัม',
      id: 'Chungnam',
      mn: 'Чүннам',
      uz: 'Chungnam',
      ne: 'चुन्गनाम',
      ru: 'Чхуннам',
      tl: 'Chungnam',
    },
    JEONBUK: {
      ko: '전북',
      en: 'Jeonbuk',
      vi: 'Jeonbuk',
      zh: '全北',
      th: 'ช็อลบุก',
      id: 'Jeonbuk',
      mn: 'Жонбүк',
      uz: 'Jeonbuk',
      ne: 'जिओनबुक',
      ru: 'Чонбук',
      tl: 'Jeonbuk',
    },
    JEONNAM: {
      ko: '전남',
      en: 'Jeonnam',
      vi: 'Jeonnam',
      zh: '全南',
      th: 'ช็อลนัม',
      id: 'Jeonnam',
      mn: 'Жоннам',
      uz: 'Jeonnam',
      ne: 'जिओननाम',
      ru: 'Чоннам',
      tl: 'Jeonnam',
    },
    GYEONGBUK: {
      ko: '경북',
      en: 'Gyeongbuk',
      vi: 'Gyeongbuk',
      zh: '庆北',
      th: 'คยองบุก',
      id: 'Gyeongbuk',
      mn: 'Кёнбүк',
      uz: 'Gyeongbuk',
      ne: 'ग्योन्गबुक',
      ru: 'Кёнбук',
      tl: 'Gyeongbuk',
    },
    GYEONGNAM: {
      ko: '경남',
      en: 'Gyeongnam',
      vi: 'Gyeongnam',
      zh: '庆南',
      th: 'คยองนัม',
      id: 'Gyeongnam',
      mn: 'Кённам',
      uz: 'Gyeongnam',
      ne: 'ग्योन्गनाम',
      ru: 'Кённам',
      tl: 'Gyeongnam',
    },
    JEJU: {
      ko: '제주',
      en: 'Jeju',
      vi: 'Jeju',
      zh: '济州',
      th: 'เชจู',
      id: 'Jeju',
      mn: 'Жэжү',
      uz: 'Jeju',
      ne: 'जेजु',
      ru: 'Чеджу',
      tl: 'Jeju',
    },
  };

  const entry = labels[region.toUpperCase()];
  if (!entry) return region;

  return getLocalizedLabel(entry, language);
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
