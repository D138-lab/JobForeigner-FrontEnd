import { ResumeList, UserProfile } from '@/components/profile';

import { ApplicationHistory } from '@/components/profile/ApplicationHistory';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './page.module.scss';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useEffect } from 'react';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import useGetResumeList from '@/lib/apis/queries/useGetResumeList';

export default function ProfilePage() {
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const name = useAuthStore(state => state.name);
  const email = useAuthStore(state => state.email);
  const phoneNumber = useAuthStore(state => state.phoneNumber);
  const profileImageUrl = useAuthStore(state => state.profileImageUrl);
  const address = useAuthStore(state => state.address) ?? {
    address: '',
    detailAddress: '',
    zipcode: '',
  };
  const setName = useAuthStore(state => state.setName);
  const setType = useAuthStore(state => state.setType);
  const setPhoneNumber = useAuthStore(state => state.setPhoneNumber);
  const setEmail = useAuthStore(state => state.setEmail);
  const setProfileImageUrl = useAuthStore(state => state.setProfileImageUrl);
  const setAddress = useAuthStore(state => state.setAddress);

  const { data: myInfo } = useGetMyInfo();

  const { data, isLoading } = useGetResumeList();

  useEffect(() => {
    if (!isLoggedIn || !myInfo) return;
    setName(myInfo.name);
    setType(myInfo.type);
    setPhoneNumber(myInfo.phoneNumber);
    setEmail(myInfo.email);
    setProfileImageUrl(myInfo.profile_image_url);
    setAddress(myInfo.address);
  }, [
    isLoggedIn,
    myInfo,
    setName,
    setType,
    setPhoneNumber,
    setEmail,
    setProfileImageUrl,
    setAddress,
  ]);

  const resumes = (data?.data.content || []).map(item => ({
    id: item.resumeId,
    title: item.resumeTitle,
    status: '작성완료',
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  const applications = [
    {
      id: 1,
      company: '토스',
      position: '프론트엔드 개발자',
      appliedAt: '2021-08-01',
      status: '서류 검토중',
    },
    {
      id: 2,
      company: '당근마켓',
      position: '백엔드 개발자',
      appliedAt: '2021-08-01',
      status: '면접 예정',
    },
    {
      id: 3,
      company: '네이버',
      position: '디자이너',
      appliedAt: '2021-08-01',
      status: '탈락',
    },
  ];

  const userInfo = {
    name,
    email,
    phoneNumber,
    profileImageUrl,
    region: address?.address ?? '',
    resumes,
    applications,
  };

  return (
    <div className={styles.container}>
      <main className={styles.page}>
        <h1>프로필</h1>
        <UserProfile userInfo={userInfo} />

        <section>
          <div className={styles.sectionHeader}>
            <h2>내 이력서</h2>
            <Link to='/profile/resume' className={styles.sectionHeaderRight}>
              더보기
              <ChevronRight />
            </Link>
          </div>

          {isLoading ? (
            <p>불러오는 중...</p>
          ) : (
            <ResumeList resumes={resumes}>
              <ResumeList.items resumes={resumes} />
            </ResumeList>
          )}
        </section>

        <section>
          <div className={styles.sectionHeader}>
            <h2>지원 내역</h2>
            <Link
              to='/profile/applications'
              className={styles.sectionHeaderRight}
            >
              더보기
              <ChevronRight />
            </Link>
          </div>
          <ApplicationHistory applications={applications} />
        </section>
      </main>
    </div>
  );
}
