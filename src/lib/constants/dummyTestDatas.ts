import { DetailPostBoxProps } from '@/components/community/DetailPostBox';
import { PostBoxProps } from '@/components/community/PostBox';
// Detail post type (id 포함)
export interface DetailPostBoxWithId extends DetailPostBoxProps {
  id: number;
}

// Comment type
export interface CommentDetailProps {
  id: number;
  postId: number;
  parentId: number | null; // null이면 일반 댓글, 숫자면 답글(부모 댓글 id)

  userName: string;
  country: string;
  isVerifiedUser: boolean;

  postedAt: Date;
  content: string;

  numOfLiked: number;
  isLikedByMe: boolean;
}

export const postBoxDummyData: PostBoxProps[] = [
  {
    id: 1,
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: '응우옌 반 민',
    isVerified: true,
    postedAt: new Date('2025-01-05T09:30:00Z'),
    nationality: 'Vietnam',
    category: '일반 게시글',
    tags: ['비자', '취업비자', '갱신'],
    title: 'E-9 취업비자 갱신 방법이 궁금합니다',
    content: '현재 E-9 비자로 근무 중인데 몇 달 후 만료 예정입니다...',
    numOfLike: 24,
    numOfComment: 3,
  },
  {
    id: 2,
    imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    name: '마리아 곤잘레스',
    isVerified: false,
    postedAt: new Date('2025-01-04T14:10:00Z'),
    nationality: 'Philippines',
    category: '일반 게시글',
    tags: ['취업', '공장', '급여'],
    title: '경기도 지역 공장 급여 수준이 어떤가요?',
    content: '경기도에 있는 공장에서 근무 제안을 받았습니다...',
    numOfLike: 17,
    numOfComment: 0,
  },
  {
    id: 3,
    imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: '알리 하산',
    isVerified: true,
    postedAt: new Date('2025-01-03T18:45:00Z'),
    nationality: 'Uzbekistan',
    category: '중고거래',
    tags: ['생활', '주거', '정보'],
    title: '외국인을 위한 저렴한 주거지 찾는 팁',
    content: '서울은 월세가 너무 비쌉니다...',
    numOfLike: 31,
    numOfComment: 2,
  },
  {
    id: 4,
    imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    name: '시티 아이샤',
    isVerified: false,
    postedAt: new Date('2025-01-02T08:20:00Z'),
    nationality: 'Indonesia',
    category: 'LANGUAGE',
    tags: ['언어교환', '한국어', '공부'],
    title: '한국어 언어교환 파트너를 찾고 있어요',
    content: '한국어 회화 실력을 늘리고 싶습니다...',
    numOfLike: 12,
    numOfComment: 1,
  },
  {
    id: 5,
    imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    name: '카를로스 멘도사',
    isVerified: true,
    postedAt: new Date('2025-01-01T21:55:00Z'),
    nationality: 'Peru',
    category: '중고거래',
    tags: ['건강', '보험', '병원'],
    title: '외국인 근로자 건강보험 제도 질문',
    content: '한국의 국민건강보험 제도가 잘 이해되지 않습니다...',
    numOfLike: 28,
    numOfComment: 1,
  },
];

export const detailPostDummyData: DetailPostBoxWithId[] = postBoxDummyData.map(
  post => ({
    id: post.id,
    category: post.category,
    userImgUrl: post.imageUrl,
    title: post.title,
    tags: post.tags,
    userName: post.name,
    isVerifiedUser: post.isVerified,
    country: post.nationality,
    postedAt: post.postedAt,
    content: post.content,
    numOfLiked: post.numOfLike,
    numOfComment: post.numOfComment,
  }),
);

export const commentDetailDummyData: CommentDetailProps[] = [
  // Post 1
  {
    id: 101,
    postId: 1,
    parentId: null,
    userName: '마리아 곤잘레스',
    country: 'Philippines',
    isVerifiedUser: false,
    postedAt: new Date('2025-01-05T11:10:00Z'),
    content: '저는 작년에 갱신했는데...',
    numOfLiked: 5,
    isLikedByMe: false,
  },
  {
    id: 102,
    postId: 1,
    parentId: 101,
    userName: '응우옌 반 민',
    country: 'Vietnam',
    isVerifiedUser: true,
    postedAt: new Date('2025-01-05T12:05:00Z'),
    content: '답변 감사합니다!',
    numOfLiked: 2,
    isLikedByMe: true,
  },

  // Post 3
  {
    id: 201,
    postId: 3,
    parentId: null,
    userName: '카를로스 멘도사',
    country: 'Peru',
    isVerifiedUser: true,
    postedAt: new Date('2025-01-03T20:15:00Z'),
    content: '쉐어하우스는 보증금이 낮은 대신...',
    numOfLiked: 4,
    isLikedByMe: false,
  },

  // Post 4
  {
    id: 301,
    postId: 4,
    parentId: null,
    userName: '알리 하산',
    country: 'Uzbekistan',
    isVerifiedUser: true,
    postedAt: new Date('2025-01-02T10:30:00Z'),
    content: '저도 언어교환 관심 있습니다.',
    numOfLiked: 1,
    isLikedByMe: false,
  },

  // Post 5
  {
    id: 401,
    postId: 5,
    parentId: null,
    userName: '시티 아이샤',
    country: 'Indonesia',
    isVerifiedUser: false,
    postedAt: new Date('2025-01-02T11:30:00Z'),
    content: '회사에서 자동 적용되는 경우가 많습니다.',
    numOfLiked: 3,
    isLikedByMe: true,
  },
];
