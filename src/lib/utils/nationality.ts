const nationality = [
  { name: 'South Korea', koreanName: '대한민국', code: 'KR', flag: '🇰🇷' },
  { name: 'Vietnam', koreanName: '베트남', code: 'VN', flag: '🇻🇳' },
  { name: 'Philippines', koreanName: '필리핀', code: 'PH', flag: '🇵🇭' },
  { name: 'Indonesia', koreanName: '인도네시아', code: 'ID', flag: '🇮🇩' },
  { name: 'Uzbekistan', koreanName: '우즈베키스탄', code: 'UZ', flag: '🇺🇿' },
  { name: 'Thailand', koreanName: '태국', code: 'TH', flag: '🇹🇭' },
  { name: 'Nepal', koreanName: '네팔', code: 'NP', flag: '🇳🇵' },
  { name: 'Cambodia', koreanName: '캄보디아', code: 'KH', flag: '🇰🇭' },
  { name: 'Myanmar', koreanName: '미얀마', code: 'MM', flag: '🇲🇲' },
  { name: 'Sri Lanka', koreanName: '스리랑카', code: 'LK', flag: '🇱🇰' },
  { name: 'Bangladesh', koreanName: '방글라데시', code: 'BD', flag: '🇧🇩' },
  { name: 'Pakistan', koreanName: '파키스탄', code: 'PK', flag: '🇵🇰' },
  { name: 'India', koreanName: '인도', code: 'IN', flag: '🇮🇳' },
  { name: 'China', koreanName: '중국', code: 'CN', flag: '🇨🇳' },
  { name: 'Japan', koreanName: '일본', code: 'JP', flag: '🇯🇵' },
  { name: 'Mongolia', koreanName: '몽골', code: 'MN', flag: '🇲🇳' },
  { name: 'Peru', koreanName: '페루', code: 'PE', flag: '🇵🇪' },
  { name: 'Mexico', koreanName: '멕시코', code: 'MX', flag: '🇲🇽' },
];

export const nationalityWithFlagAndKorean = (nationalName: string) => {
  const n = nationality.find(n => n.name === nationalName);
  return n ? `${n.flag} ${n.koreanName}` : nationalName;
};
