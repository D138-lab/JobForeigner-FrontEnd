import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { lazy } from 'react';
import Layout from './components/layout/Layout';

// 만든 HOC 임포트
import withSuspense from '@/pages/withSuspense';
import LayoutWithSidebar from './components/layout/LayoutWithSidebar';
import {
  companySidebarNavItems,
  userSidebarNavItems,
} from './lib/constants/navItems';
import { PATH } from './lib/constants/routes';

// 메인 페이지랑 관련된 페이지들
const MainPage = lazy(() => import('./pages/main/Page'));

// 유저용 프로필이랑 관련된 페이지들
const ProfilePage = lazy(() => import('./pages/profile/Page'));
const UserProfileEditPage = lazy(() => import('./pages/profile/edit/Page'));
const ResumeListPage = lazy(() => import('./pages/profile/resume/Page'));
const CreateResumePage = lazy(
  () => import('./pages/profile/resume/create/Page'),
);
const EditResumePage = lazy(() => import('./pages/profile/resume/edit/Page'));
const ResumePreviewPage = lazy(
  () => import('./pages/profile/resume/preview/detail/Page'),
);
const ApplicationsPage = lazy(
  () => import('./pages/profile/applications/Page'),
);
const LikedCompaniesPage = lazy(
  () => import('./pages/profile/bookmark/liked-companies/Page'),
);
const ScrapRecruitmentsPage = lazy(
  () => import('./pages/profile/bookmark/scraps/Page'),
);

// 기업용 프로필이랑 관련된 페이지들
const CompanyProfilePage = lazy(() => import('./pages/profile/company/Page'));
const CompanyProfileEditPage = lazy(
  () => import('./pages/profile/company/edit/Page'),
);
const CompanyProfileRecruitmentPage = lazy(
  () => import('./pages/profile/company/recruitment/Page'),
);
const CompanyProfileApplicationsPage = lazy(
  () => import('./pages/profile/company/applications/Page'),
);

const CommunityPage = lazy(() => import('./pages/community/Page'));
const CompaniesPage = lazy(() => import('./pages/companies/Page'));
const RecruitPage = lazy(() => import('./pages/jobs/Page'));
const DetailRecruitPage = lazy(() => import('./pages/jobs/DetailPage'));
const DetailCompanyPage = lazy(() => import('./pages/companies/DetailPage'));
const SelectResumePage = lazy(() => import('./pages/jobs/SelectResume'));
const ApplySuccessedPage = lazy(() => import('./pages/jobs/ApplySuccessed'));
const ApplyFailedPage = lazy(() => import('./pages/jobs/ApplyFailed'));
const NotFoundPage = lazy(() => import('./pages/notFound/Page'));
const RegisterPage = lazy(() => import('./pages/register/Page'));
const LoginPage = lazy(() => import('./pages/login/Page'));

// 각 페이지를 Suspense가 적용된 HOC로 감싸기
// 메인 페이지랑 관련된 페이지들
const SuspensedMainPage = withSuspense(MainPage);

// 유저용 프로필이랑 관련된 페이지들
const SuspensedProfilePage = withSuspense(ProfilePage);
const SuspensedUserProfileEditPage = withSuspense(UserProfileEditPage);
const SuspensedResumeListPage = withSuspense(ResumeListPage);
const SuspensedCreateResumePage = withSuspense(CreateResumePage);
const SuspensedEditResumePage = withSuspense(EditResumePage);
const SuspensedResumePreviewPage = withSuspense(ResumePreviewPage);
const SuspensedApplicationsPage = withSuspense(ApplicationsPage);
const SuspensedLikedCompaniesPage = withSuspense(LikedCompaniesPage);
const SuspensedScrapRecruitmentsPage = withSuspense(ScrapRecruitmentsPage);

// 기업용 프로필이랑 관련된 페이지들
const SuspensedCompanyProfilePage = withSuspense(CompanyProfilePage);
const SuspensedCompanyProfileEditPage = withSuspense(CompanyProfileEditPage);
const SuspensedCompanyProfileRecruitmentPage = withSuspense(
  CompanyProfileRecruitmentPage,
);
const SuspensedCompanyProfileApplicationsPage = withSuspense(
  CompanyProfileApplicationsPage,
);

const SuspensedCommunityPage = withSuspense(CommunityPage);
const SuspensedCompaniesPage = withSuspense(CompaniesPage);
const SuspensedRecruitPage = withSuspense(RecruitPage);
const SuspensedDetailRecruitPage = withSuspense(DetailRecruitPage);
const SuspensedDetailCompanyPage = withSuspense(DetailCompanyPage);
const SuspensedSelectResumePage = withSuspense(SelectResumePage);
const SuspensedApplySuccessedPage = withSuspense(ApplySuccessedPage);
const SuspensedApplyFailPage = withSuspense(ApplyFailedPage);
const SuspensedNotFoundPage = withSuspense(NotFoundPage);
const SuspensedRegisterPage = withSuspense(RegisterPage);
const SuspensedLoginPage = withSuspense(LoginPage);

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Layout이 적용되는 라우트들 */}
      <Route path={PATH.INDEX} element={<Layout />}>
        <Route index element={<SuspensedMainPage />} />
        <Route path={PATH.COMMUNITY} element={<SuspensedCommunityPage />} />
        <Route path={PATH.COMPANIES} element={<SuspensedCompaniesPage />} />
        <Route
          path={PATH.COMPANIES_DETAIL}
          element={<SuspensedDetailCompanyPage />}
        />
        <Route path={PATH.JOBS} element={<SuspensedRecruitPage />} />
        <Route
          path={PATH.JOB_DETAIL}
          element={<SuspensedDetailRecruitPage />}
        />
        <Route
          path={PATH.SELECT_RESUME}
          element={<SuspensedSelectResumePage />}
        />
        <Route
          path={PATH.APPLY_SUCCESS}
          element={<SuspensedApplySuccessedPage />}
        />
        <Route path={PATH.APPLY_FAIL} element={<SuspensedApplyFailPage />} />
        <Route path={PATH.REGISTER} element={<SuspensedRegisterPage />} />
        <Route path={PATH.LOGIN} element={<SuspensedLoginPage />} />
      </Route>

      {/* 유저 프로필 관련 라우트 */}
      <Route
        path={PATH.INDEX}
        element={<LayoutWithSidebar navItems={userSidebarNavItems} />}
      >
        <Route path={PATH.PROFILE} element={<SuspensedProfilePage />} />
        <Route
          path={PATH.PROFILE_EDIT}
          element={<SuspensedUserProfileEditPage />}
        />
        <Route
          path={PATH.PROFILE_RESUME}
          element={<SuspensedResumeListPage />}
        />
        <Route
          path={PATH.PROFILE_RESUME_CREATE}
          element={<SuspensedCreateResumePage />}
        />
        <Route
          path={PATH.PROFILE_RESUME_EDIT}
          element={<SuspensedEditResumePage />}
        />
        <Route
          path={PATH.PROFILE_RESUME_DETAIL}
          element={<SuspensedResumePreviewPage />}
        />
        <Route
          path={PATH.PROFILE_APPLICATIONS}
          element={<SuspensedApplicationsPage />}
        />
        <Route
          path={PATH.PROFILE_LIKED_COMPANIES}
          element={<SuspensedLikedCompaniesPage />}
        />
        <Route
          path={PATH.PROFILE_SCRAPS}
          element={<SuspensedScrapRecruitmentsPage />}
        />
      </Route>

      {/* 기업 프로필 관련 라우트 */}
      <Route
        path={PATH.INDEX}
        element={<LayoutWithSidebar navItems={companySidebarNavItems} />}
      >
        <Route
          path={PATH.PROFILE_COMPANY}
          element={<SuspensedCompanyProfilePage />}
        />
        <Route
          path={PATH.PROFILE_COMPANY_EDIT}
          element={<SuspensedCompanyProfileEditPage />}
        />
        <Route
          path={PATH.PROFILE_COMPANY_RECRUITMENT}
          element={<SuspensedCompanyProfileRecruitmentPage />}
        />
        <Route
          path={PATH.PROFILE_COMPANY_APPLICATIONS}
          element={<SuspensedCompanyProfileApplicationsPage />}
        />
      </Route>

      {/* Layout이 적용되지 않는 라우트 */}
      <Route path={PATH.NOT_FOUND} element={<SuspensedNotFoundPage />} />
    </>,
  ),
);
