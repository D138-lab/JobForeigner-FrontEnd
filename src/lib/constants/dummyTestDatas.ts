import { DetailPostBoxProps } from '@/components/community/DetailPostBox';
import { PostBoxProps } from '@/components/community/PostBox';

export interface DetailPostBoxWithId extends DetailPostBoxProps {
  id: number;
}

export interface CommentDetailProps {
  id: number;
  postId: number;
  parentId: number | null;

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
    isLiked: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: '응우옌 반 민',
    isVerified: true,
    postedAt: new Date('2025-01-05T09:30:00Z'),
    nationality: 'Vietnam',
    category: '일반 게시글',
    tags: ['비자', '취업비자', '갱신'],
    title: 'E-9 취업비자 갱신 방법이 궁금합니다',
    content: `현재 E-9 비자로 한국에서 제조업 분야에 근무하고 있으며, 비자 만료일이 몇 달 남지 않았습니다.
처음 갱신을 진행하는 상황이라 절차가 정확히 어떻게 되는지 잘 모르겠습니다.

제가 궁금한 내용은 아래와 같습니다.

    1) 회사에서 준비해줘야 하는 서류
       - 재직증명서, 사업자 관련 서류 등 회사가 발급해주는 문서가 있는지
    2) 개인이 준비해야 하는 서류
       - 여권, 외국인등록증, 사진, 수수료 등 개인이 준비할 항목이 무엇인지
    3) 방문/예약 절차
       - 출입국관리사무소 방문은 반드시 예약이 필요한지
       - 예약이 필요하다면 평균적으로 며칠 전부터 잡아야 하는지

또한 갱신 신청 후 심사 기간 동안 비자가 만료되는 경우,
    - 체류 자격이 자동으로 연장되는지
    - 접수증으로 체류가 가능한지
이 부분도 경험이 있으신 분들의 조언을 부탁드립니다.

긴 글 읽어주셔서 감사합니다.`,
    numOfLike: 24,
    numOfComment: 3,
  },
  {
    id: 2,
    isLiked: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
    name: '마리아 곤잘레스',
    isVerified: false,
    postedAt: new Date('2025-01-04T14:10:00Z'),
    nationality: 'Philippines',
    category: '일반 게시글',
    tags: ['취업', '공장', '급여'],
    title: '경기도 지역 공장 급여 수준이 어떤가요?',
    content: `최근 경기도 소재 전자부품 공장에서 근무 제안을 받았습니다.
면접 때 설명을 들었는데, 실제로는 어떤지 경험자 의견이 궁금합니다.

제가 확인하고 싶은 포인트는 아래입니다.

    - 기본급(세전/세후) 평균 범위
    - 잔업/야간/특근 수당이 정확히 계산되는지
    - 주 52시간이 현실적으로 지켜지는지 (잔업이 많다면 빈도/시간)
    - 기숙사 제공 여부
        · 제공된다면 비용(월 공제액)과 시설 상태
        · 공과금/관리비 포함 여부
    - 급여일, 급여명세서 제공 여부

혹시 실제로 근무 중이신 분이 있다면
    “월 실수령액(대략)”과 “근무 강도”
이런 정보도 공유해주시면 정말 도움이 될 것 같습니다.`,
    numOfLike: 17,
    numOfComment: 0,
  },
  {
    id: 3,
    isLiked: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: '알리 하산',
    isVerified: true,
    postedAt: new Date('2025-01-03T18:45:00Z'),
    nationality: 'Uzbekistan',
    category: '중고거래',
    tags: ['생활', '주거', '정보'],
    title: '외국인을 위한 저렴한 주거지 찾는 팁',
    content: `서울에서 월세 부담이 점점 커지고 있어 고민입니다.
보증금이 낮은 원룸이나 쉐어하우스를 찾는 중인데, 외국인 신분이라 계약이 더 복잡한 느낌이 있습니다.

질문은 크게 3가지입니다.

    1) 외국인 계약 시 추가로 요구되는 조건이 있나요?
       - 보증인 요구, 서류 추가 제출 등
    2) 부동산 계약 vs 커뮤니티 직거래
       - 어느 쪽이 안전한지
       - 직거래라면 사기 예방 체크리스트가 있는지
    3) 계약서에서 꼭 확인해야 하는 항목
       - 관리비 항목(전기/가스/수도/인터넷)
       - 퇴실 시 보증금 반환 기준
       - 하자(곰팡이/누수) 책임 소재

또한 전세/월세 사기 사례가 많다고 들어서 걱정됩니다.
    - 등기부등본 확인 방법
    - 확정일자/전입신고 관련 팁
이런 부분도 조언해주시면 감사하겠습니다.`,
    numOfLike: 31,
    numOfComment: 2,
  },
  {
    id: 4,
    isLiked: false,
    imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    name: '시티 아이샤',
    isVerified: false,
    postedAt: new Date('2025-01-02T08:20:00Z'),
    nationality: 'Indonesia',
    category: 'LANGUAGE',
    tags: ['언어교환', '한국어', '공부'],
    title: '한국어 언어교환 파트너를 찾고 있어요',
    content: `한국에서 생활한 지 1년이 되었지만 아직 회화 실력이 부족하다고 느낍니다.
일상 대화는 가능하지만, 직장 동료들과 조금 더 자연스럽게 이야기하고 싶어요.

제가 원하는 방식은 아래 중 편한 걸로 맞출 수 있습니다.

    - 오프라인: 주 1회 카페에서 1~2시간
    - 온라인: 주 1~2회 화상(저녁 시간대 선호)

진행 방식도 같이 정하면 좋겠어요.

    1) 30분 한국어(일상/직장 표현)
    2) 30분 인도네시아어(기초 회화/여행 표현)
    3) 마지막 10분은 자유 대화 + 피드백

알레르기나 특정 음식 제한은 없고,
부담 없이 편하게 대화하면서 서로 도와줄 분을 찾고 있습니다.
관심 있으시면 댓글 남겨주세요!`,
    numOfLike: 12,
    numOfComment: 1,
  },
  {
    id: 5,
    isLiked: true,
    imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    name: '카를로스 멘도사',
    isVerified: true,
    postedAt: new Date('2025-01-01T21:55:00Z'),
    nationality: 'Peru',
    category: '중고거래',
    tags: ['건강', '보험', '병원'],
    title: '외국인 근로자 건강보험 제도 질문',
    content: `한국의 국민건강보험 제도가 외국인 근로자에게 어떻게 적용되는지 정확히 이해하고 싶습니다.
최근 병원 방문 예정이라 더 급하게 알아보고 있습니다.

궁금한 내용은 다음과 같습니다.

    1) 직장가입자 / 지역가입자 기준
       - 회사에 취업하면 자동으로 직장가입자가 되는지
       - 별도 신청이 필요한지
    2) 보험료 납부 방식
       - 급여에서 자동 공제되는지
       - 미납 시 불이익이 있는지
    3) 병원 이용 시 비용
       - 외래 진료 본인 부담금 비율
       - 약국 약값 적용 방식
       - 치과/한방병원도 동일하게 적용되는지

혹시 최근에 병원 다녀오신 분이나
보험 관련해서 잘 아시는 분 계시면 현실적인 설명 부탁드립니다.`,
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
  {
    id: 101,
    postId: 1,
    parentId: null,
    userName: '마리아 곤잘레스',
    country: 'Philippines',
    isVerifiedUser: false,
    postedAt: new Date('2025-01-05T11:10:00Z'),
    content: `저도 작년에 E-9 갱신을 진행했습니다. 제 경험을 정리해볼게요.

    - 회사에서 준비해준 것:
        · 재직증명서
        · 사업자 관련 서류(회사 담당자가 챙겨줌)
        · 근로계약서 사본(요청하면 출력해줌)

    - 제가 준비한 것:
        · 여권, 외국인등록증
        · 수수료(카드/현금 가능 여부는 지점마다 다를 수 있음)

출입국은 ‘온라인 예약’이 거의 필수였고,
예약이 늦으면 원하는 날짜가 잘 안 나옵니다.

팁을 하나 더 적자면,
    서류 체크리스트를 캡처해서 회사 담당자와 같이 확인하면
    빠지는 서류가 줄어들어서 좋았습니다.`,
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
    content: `정말 감사합니다!

말씀하신 “체크리스트”는
    어디에서 확인하셨는지 궁금합니다.

그리고 혹시 예약은
    1) 사이트에서 직접 하셨나요?
    2) 회사에서 도와주셨나요?

가능하면 공식 링크/경로도 알려주시면 큰 도움이 될 것 같습니다.`,
    numOfLiked: 2,
    isLikedByMe: true,
  },
  {
    id: 201,
    postId: 3,
    parentId: null,
    userName: '카를로스 멘도사',
    country: 'Peru',
    isVerifiedUser: true,
    postedAt: new Date('2025-01-03T20:15:00Z'),
    content: `쉐어하우스/원룸 계약할 때 제가 겪은 체크 포인트 공유합니다.

    1) 관리비 항목을 “문장”으로 정확히 적어두기
       - 전기/가스/수도/인터넷/청소비 포함 여부
    2) 퇴실 정산 기준 확인
       - 청소비, 수리비 공제 조건
    3) 입주 당일 사진/영상 촬영
       - 벽지, 바닥, 화장실, 창문, 보일러 상태
       - 나중에 분쟁 방지에 진짜 도움 됩니다.

직거래는 싸게 구할 수 있지만,
    계약서 없이 돈 먼저 요구하면 무조건 피하세요.

가능하면
    - 계약서 작성
    - 집주인 신분 확인
    - 입금 계좌 명의 일치
이 3가지는 꼭 확인 추천드립니다.`,
    numOfLiked: 4,
    isLikedByMe: false,
  },
];
