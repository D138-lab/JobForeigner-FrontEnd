import { ResumeList, UserProfile } from '@/components/profile';

import { ApplicationHistory } from '@/components/profile/ApplicationHistory';
import { ChevronRight, FileText, LayoutDashboard, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './page.module.scss';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import { useEffect } from 'react';
import useGetMyInfo from '@/lib/apis/mutations/useGetMyInfo';
import useGetResumeList from '@/lib/apis/queries/useGetResumeList';
import { useTranslation } from 'react-i18next';

export default function ProfilePage() {
  const { t } = useTranslation('pages');
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
    status: t('profile.resume.completed'),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }));

  const applications = [
    {
      id: 1,
      company: '토스',
      position: '프론트엔드 개발자',
      appliedAt: '2021-08-01',
      status: 'reviewing',
    },
    {
      id: 2,
      company: '당근마켓',
      position: '백엔드 개발자',
      appliedAt: '2021-08-01',
      status: 'interview',
    },
    {
      id: 3,
      company: '네이버',
      position: '디자이너',
      appliedAt: '2021-08-01',
      status: 'rejected',
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
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderText}>
            <span className={styles.eyebrow}>
              <LayoutDashboard size={14} />
              {t('profile.main.title')}
            </span>
            <h1>{t('profile.main.title')}</h1>
          </div>
        </div>
        <UserProfile userInfo={userInfo} />

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <div className={styles.sectionIcon}>
                <FileText size={18} />
              </div>
              <div>
                <h2>{t('profile.main.myResume')}</h2>
              </div>
            </div>
            <Link to='/profile/resume' className={styles.sectionHeaderRight}>
              {t('profile.main.more')}
              <ChevronRight />
            </Link>
          </div>

          {isLoading ? (
            <p>{t('profile.main.loading')}</p>
          ) : (
            <ResumeList resumes={resumes}>
              <ResumeList.items resumes={resumes} />
            </ResumeList>
          )}
        </section>

        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitleWrap}>
              <div className={styles.sectionIcon}>
                <Send size={18} />
              </div>
              <div>
                <h2>{t('profile.main.applications')}</h2>
              </div>
            </div>
            <Link
              to='/profile/applications'
              className={styles.sectionHeaderRight}
            >
              {t('profile.main.more')}
              <ChevronRight />
            </Link>
          </div>
          <ApplicationHistory applications={applications} />
        </section>
      </main>
    </div>
  );
}
