import { PostBox, PostBoxProps } from './PostBox';

import { AnnouncementAndEvent } from './AnnouncementAndEvent';
import { CustomDivider } from '../common/customDivider/CustomDivider';
import { PopularPosts } from './PopularPosts';
import { PostSortBy } from './PostSortBy';
import { SelectPostType } from './SelectPostType';
import { TopMember } from './TopMember';
import { dummyCompanyList } from '../nearby-companies/contentBox/ContentBox';
import { postSortOption } from '@/pages/community/Page';
import styles from './contentArea.module.scss';
import { useNavigate } from 'react-router-dom';

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
    content:
      '현재 E-9 비자로 근무 중인데 몇 달 후 만료 예정입니다. 갱신 시 필요한 서류와 절차, 소요 기간을 알고 싶습니다. 회사에서 별도로 준비해줘야 하는 서류가 있는지도 궁금하고, 출입국관리사무소 방문 예약은 미리 해야 하는지도 알고 싶습니다. 또한 갱신 심사 기간 동안 체류 자격은 자동으로 연장되는지, 혹시라도 거절되는 경우에는 어떻게 대응해야 하는지도 경험 있으신 분들의 조언을 부탁드립니다.',
    numOfLike: 24,
    numOfComment: 8,
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
    content:
      '경기도에 있는 공장에서 근무 제안을 받았습니다. 평균 급여와 근무 시간이 어느 정도인지 경험 있으신 분들의 의견이 궁금합니다. 특히 잔업 수당이나 야간 근무 수당이 제대로 지급되는지, 숙소 제공 여부와 공과금 부담은 어느 정도인지 알고 싶습니다. 혹시 실제로 근무해보신 분이 있다면 월 실수령액이 어느 정도였는지, 근무 환경은 어떤지 공유해주시면 정말 도움이 될 것 같습니다.',
    numOfLike: 17,
    numOfComment: 5,
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
    content:
      '서울은 월세가 너무 비쌉니다. 외국인 근로자가 비교적 저렴하게 거주할 수 있는 지역이나 팁이 있을까요? 보증금이 낮은 원룸이나 쉐어하우스를 찾고 있는데, 계약 시 주의해야 할 점도 궁금합니다. 부동산을 통해 계약하는 것이 좋은지, 온라인 커뮤니티를 통해 직거래를 하는 것이 안전한지도 고민입니다. 실제로 거주해보신 분들의 지역 추천이나 평균 시세 정보를 공유해주시면 감사하겠습니다.',
    numOfLike: 31,
    numOfComment: 12,
  },
  {
    id: 3,
    imageUrl: 'https://randomuser.me/api/portraits/women/28.jpg',
    name: '시티 아이샤',
    isVerified: false,
    postedAt: new Date('2025-01-02T08:20:00Z'),
    nationality: 'Indonesia',

    category: 'LANGUAGE',
    tags: ['언어교환', '한국어', '공부'],
    title: '한국어 언어교환 파트너를 찾고 있어요',
    content:
      '한국어 회화 실력을 늘리고 싶습니다. 언어교환이 가능하신 분 계시면 연락 주세요. 인도네시아어를 도와드릴 수 있습니다. 주 1~2회 정도 카페에서 만나거나 온라인 화상으로 대화하는 것도 좋습니다. 한국어 발음 교정과 일상 회화를 연습하고 싶고, 저도 인도네시아어 기초 회화나 여행 표현 등을 알려드릴 수 있습니다. 서로 꾸준히 도와가며 공부하실 분을 찾고 있습니다.',
    numOfLike: 12,
    numOfComment: 3,
  },
  {
    id: 4,
    imageUrl: 'https://randomuser.me/api/portraits/men/67.jpg',
    name: '카를로스 멘도사',
    isVerified: true,
    postedAt: new Date('2025-01-01T21:55:00Z'),
    nationality: 'Peru',

    category: '중고거래',
    tags: ['건강', '보험', '병원'],
    title: '외국인 근로자 건강보험 제도 질문',
    content:
      '한국의 국민건강보험 제도가 잘 이해되지 않습니다. 외국인 근로자는 자동 가입인지, 따로 신청해야 하는지 알고 싶습니다. 회사에 취업하면 자동으로 공제되는지, 지역가입자로 따로 납부해야 하는지도 궁금합니다. 또한 병원 방문 시 본인 부담금 비율은 어떻게 되는지, 치과나 한방병원도 동일하게 적용되는지도 알고 싶습니다. 경험이 있으신 분들의 설명을 부탁드립니다.',
    numOfLike: 28,
    numOfComment: 9,
  },
];

interface Props {
  sortOption: postSortOption;
  setSortOption: (option: postSortOption) => void;
  postType: string;
  setPostType: (type: string) => void;
}

export const ContentArea = ({
  sortOption,
  setSortOption,
  postType,
  setPostType,
}: Props) => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <PostSortBy
          sortOption={sortOption}
          onClick={(option: postSortOption) => setSortOption(option)}
        />
        <CustomDivider />
        <SelectPostType postType={postType} onClick={setPostType} />
        <div className={styles.posts}>
          {postBoxDummyData.map(data => (
            <PostBox
              {...data}
              onClick={() => navigate(`/community/${data.id}`)}
            />
          ))}
        </div>
      </div>
      <div className={styles.right}>
        <PopularPosts titles={postBoxDummyData.map(post => post.title)} />
        <TopMember
          people={postBoxDummyData.slice(0, 3).map(post => ({
            name: post.name,
            profileImgUrl: post.imageUrl,
          }))}
        />
        <AnnouncementAndEvent />
      </div>
    </div>
  );
};
