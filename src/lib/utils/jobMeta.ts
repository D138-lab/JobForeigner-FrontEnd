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

export const getIndustryLabel = (industry: string, language?: string): string => {
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
    MANUFACTURING: {
      ko: '제조업',
      en: 'Manufacturing',
      vi: 'Sản xuất',
      zh: '制造业',
      th: 'การผลิต',
      id: 'Manufaktur',
      mn: 'Үйлдвэрлэл',
      uz: 'Ishlab chiqarish',
      ne: 'उत्पादन',
      ru: 'Производство',
      tl: 'Manufacturing',
    },
    IT: {
      ko: 'IT',
      en: 'IT',
      vi: 'CNTT',
      zh: 'IT',
      th: 'ไอที',
      id: 'TI',
      mn: 'МТ',
      uz: 'IT',
      ne: 'आईटी',
      ru: 'ИТ',
      tl: 'IT',
    },
    BIOTECH: {
      ko: '바이오·헬스',
      en: 'Biotech/Health',
      vi: 'Công nghệ sinh học/Y tế',
      zh: '生物/健康',
      th: 'ไบโอ/สุขภาพ',
      id: 'Biotek/Kesehatan',
      mn: 'Био/Эрүүл мэнд',
      uz: 'Biotexnologiya/Sog‘liq',
      ne: 'बायोटेक/स्वास्थ्य',
      ru: 'Биотех/Здоровье',
      tl: 'Biotech/Kalusugan',
    },
    FINANCE_INSURANCE: {
      ko: '금융·보험',
      en: 'Finance/Insurance',
      vi: 'Tài chính/Bảo hiểm',
      zh: '金融/保险',
      th: 'การเงิน/ประกัน',
      id: 'Keuangan/Asuransi',
      mn: 'Санхүү/Даатгал',
      uz: 'Moliya/Sug‘urta',
      ne: 'वित्त/बीमा',
      ru: 'Финансы/Страхование',
      tl: 'Pananalapi/Seguro',
    },
    CONSTRUCTION_REAL_ESTATE: {
      ko: '건설·부동산',
      en: 'Construction/Real Estate',
      vi: 'Xây dựng/Bất động sản',
      zh: '建筑/房地产',
      th: 'ก่อสร้าง/อสังหา',
      id: 'Konstruksi/Properti',
      mn: 'Барилга/Үл хөдлөх',
      uz: 'Qurilish/Ko‘chmas mulk',
      ne: 'निर्माण/अचल सम्पत्ति',
      ru: 'Строительство/Недвижимость',
      tl: 'Konstruksyon/Real Estate',
    },
    RETAIL_TRADE: {
      ko: '유통·무역',
      en: 'Retail/Trade',
      vi: 'Bán lẻ/Thương mại',
      zh: '流通/贸易',
      th: 'ค้าปลีก/การค้า',
      id: 'Ritel/Perdagangan',
      mn: 'Жижиглэн/Худалдаа',
      uz: 'Chakana savdo/Savdo',
      ne: 'खुद्रा/व्यापार',
      ru: 'Ритейл/Торговля',
      tl: 'Retail/Kalakalan',
    },
    EDUCATION_RESEARCH: {
      ko: '교육·연구',
      en: 'Education/Research',
      vi: 'Giáo dục/Nghiên cứu',
      zh: '教育/研究',
      th: 'การศึกษา/วิจัย',
      id: 'Pendidikan/Penelitian',
      mn: 'Боловсрол/Судалгаа',
      uz: 'Ta’lim/Tadqiqot',
      ne: 'शिक्षा/अनुसन्धान',
      ru: 'Образование/Исследования',
      tl: 'Edukasyon/Pananaliksik',
    },
    HEALTHCARE_MEDICAL: {
      ko: '의료·보건',
      en: 'Healthcare/Medical',
      vi: 'Y tế/Chăm sóc sức khỏe',
      zh: '医疗/保健',
      th: 'การแพทย์/สุขภาพ',
      id: 'Kesehatan/Medis',
      mn: 'Эрүүл мэнд/Эмнэлэг',
      uz: 'Tibbiyot/Sog‘liqni saqlash',
      ne: 'स्वास्थ्य/चिकित्सा',
      ru: 'Медицина/Здравоохранение',
      tl: 'Healthcare/Medikal',
    },
    MEDIA_ENTERTAINMENT: {
      ko: '미디어·엔터테인먼트',
      en: 'Media/Entertainment',
      vi: 'Truyền thông/Giải trí',
      zh: '媒体/娱乐',
      th: 'สื่อ/บันเทิง',
      id: 'Media/Hiburan',
      mn: 'Медиа/Энтертайнмент',
      uz: 'Media/Ko‘ngilochar',
      ne: 'मिडिया/मनोरञ्जन',
      ru: 'Медиа/Развлечения',
      tl: 'Media/Libangan',
    },
    SERVICE_INDUSTRY: {
      ko: '서비스업',
      en: 'Service Industry',
      vi: 'Dịch vụ',
      zh: '服务业',
      th: 'ภาคบริการ',
      id: 'Jasa',
      mn: 'Үйлчилгээ',
      uz: 'Xizmat ko‘rsatish',
      ne: 'सेवा उद्योग',
      ru: 'Сфера услуг',
      tl: 'Serbisyo',
    },
    ENERGY_ENVIRONMENT: {
      ko: '에너지·환경',
      en: 'Energy/Environment',
      vi: 'Năng lượng/Môi trường',
      zh: '能源/环境',
      th: 'พลังงาน/สิ่งแวดล้อม',
      id: 'Energi/Lingkungan',
      mn: 'Эрчим хүч/Байгаль орчин',
      uz: 'Energiya/Atrof-muhit',
      ne: 'ऊर्जा/वातावरण',
      ru: 'Энергетика/Экология',
      tl: 'Enerhiya/Kapaligiran',
    },
    TRANSPORTATION_LOGISTICS: {
      ko: '운송·물류',
      en: 'Transportation/Logistics',
      vi: 'Vận tải/Logistics',
      zh: '运输/物流',
      th: 'ขนส่ง/โลจิสติกส์',
      id: 'Transportasi/Logistik',
      mn: 'Тээвэр/Логистик',
      uz: 'Transport/Logistika',
      ne: 'यातायात/लजिस्टिक्स',
      ru: 'Транспорт/Логистика',
      tl: 'Transportasyon/Logistics',
    },
    AGRICULTURE_FOOD: {
      ko: '농업·식품',
      en: 'Agriculture/Food',
      vi: 'Nông nghiệp/Thực phẩm',
      zh: '农业/食品',
      th: 'เกษตร/อาหาร',
      id: 'Pertanian/Pangan',
      mn: 'Хөдөө аж ахуй/Хүнс',
      uz: 'Qishloq xo‘jaligi/Oziq-ovqat',
      ne: 'कृषि/खाद्य',
      ru: 'Сельское хозяйство/Пищевая промышленность',
      tl: 'Agrikultura/Pagkain',
    },
    FASHION_BEAUTY: {
      ko: '패션·뷰티',
      en: 'Fashion/Beauty',
      vi: 'Thời trang/Làm đẹp',
      zh: '时尚/美妆',
      th: 'แฟชั่น/ความงาม',
      id: 'Fashion/Kecantikan',
      mn: 'Загвар/Гоо сайхан',
      uz: 'Moda/Go‘zallik',
      ne: 'फेसन/सौन्दर्य',
      ru: 'Мода/Красота',
      tl: 'Fashion/Kagandahan',
    },
    TELECOM_NETWORK: {
      ko: '통신·네트워크',
      en: 'Telecom/Network',
      vi: 'Viễn thông/Mạng',
      zh: '通信/网络',
      th: 'โทรคมนาคม/เครือข่าย',
      id: 'Telekomunikasi/Jaringan',
      mn: 'Харилцаа холбоо/Сүлжээ',
      uz: 'Telekom/Tarmoq',
      ne: 'दूरसञ्चार/सञ्जाल',
      ru: 'Телеком/Сети',
      tl: 'Telecom/Network',
    },
    AUTOMOTIVE_MOBILITY: {
      ko: '자동차·모빌리티',
      en: 'Automotive/Mobility',
      vi: 'Ô tô/Mobility',
      zh: '汽车/出行',
      th: 'ยานยนต์/โมบิลิตี้',
      id: 'Otomotif/Mobilitas',
      mn: 'Автомашин/Хөдөлгөөнт',
      uz: 'Avtomobil/Mobillik',
      ne: 'अटोमोबाइल/मोबिलिटी',
      ru: 'Автомобили/Мобильность',
      tl: 'Automotive/Mobility',
    },
    GAMING_SOFTWARE: {
      ko: '게임·소프트웨어',
      en: 'Gaming/Software',
      vi: 'Game/Phần mềm',
      zh: '游戏/软件',
      th: 'เกม/ซอฟต์แวร์',
      id: 'Game/Perangkat Lunak',
      mn: 'Тоглоом/Програм хангамж',
      uz: 'O‘yin/Dasturiy ta’minot',
      ne: 'गेम/सफ्टवेयर',
      ru: 'Игры/ПО',
      tl: 'Gaming/Software',
    },
    STARTUP: {
      ko: '스타트업',
      en: 'Startup',
      vi: 'Startup',
      zh: '初创公司',
      th: 'สตาร์ทอัพ',
      id: 'Startup',
      mn: 'Стартап',
      uz: 'Startap',
      ne: 'स्टार्टअप',
      ru: 'Стартап',
      tl: 'Startup',
    },
    PUBLIC_SECTOR: {
      ko: '공공기관',
      en: 'Public Sector',
      vi: 'Khu vực công',
      zh: '公共机构',
      th: 'ภาครัฐ',
      id: 'Sektor Publik',
      mn: 'Төрийн байгууллага',
      uz: 'Davlat sektori',
      ne: 'सार्वजनिक क्षेत्र',
      ru: 'Государственный сектор',
      tl: 'Pampublikong Sektor',
    },
    OTHER: {
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

  const entry = labels[industry.toUpperCase()];
  if (!entry) return industry;

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
