import { BookMarked, Briefcase, FileText } from 'lucide-react';

export const headerNavItems = [
  {
    id: 1,
    name: 'recruitmentInfo',
    link: './jobs',
  },
  {
    id: 2,
    name: 'companiesInfo',
    link: './companies',
  },
  {
    id: 3,
    name: 'nearBy',
    link: './nearby-companies',
  },
  {
    id: 4,
    name: 'nearByPlaces',
    link: './nearby-places',
  },
  {
    id: 5,
    name: 'community',
    link: './community',
  },
];

export const userSidebarNavItems = [
  {
    name: '이력서 관리',
    icon: <FileText />,
    items: [{ name: '이력서 목록', href: '/profile/resume' }],
  },
  {
    name: '지원 관리',
    icon: <Briefcase />,
    items: [{ name: '지원 내역', href: '/profile/applications' }],
  },
  {
    name: '북마크',
    icon: <BookMarked />,
    items: [
      { name: '관심 기업', href: '/profile/liked-companies' },
      { name: '스크랩', href: '/profile/scraps' },
    ],
  },
];

export const companySidebarNavItems = [
  {
    name: '채용 관리',
    icon: <Briefcase />,
    items: [
      { name: '채용 공고 목록', href: '/profile/company/recruitment' },
      { name: '새 채용 공고 작성', href: '/write-recruitment' },
    ],
  },
  {
    name: '지원서 관리',
    icon: <FileText />,
    items: [{ name: '지원서 목록', href: '/profile/company/applications' }],
  },
];
