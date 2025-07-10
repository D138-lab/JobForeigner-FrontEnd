export const PATH = {
  INDEX: '/',

  LOGIN: '/login',
  REGISTER: '/register',

  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_RESUME: '/profile/resume',
  PROFILE_RESUME_CREATE: '/profile/resume/create',
  PROFILE_RESUME_DETAIL: '/profile/resume/:resumeId',
  PROFILE_APPLICATIONS: '/profile/applications',
  PROFILE_LIKED_COMPANIES: '/profile/liked-companies',
  PROFILE_SCRAPS: '/profile/scraps',

  PROFILE_COMPANY: '/profile/company',
  PROFILE_COMPANY_EDIT: '/profile/company/edit',
  PROFILE_COMPANY_RECRUITMENT: '/profile/company/recruitment',
  PROFILE_COMPANY_APPLICATIONS: '/profile/company/applications',

  COMMUNITY: '/community',

  COMPANIES: '/companies',
  COMPANIES_DETAIL: '/companies/:id',

  JOBS: '/jobs',
  JOB_DETAIL: '/jobs/:id',

  SELECT_RESUME: '/select-resume',

  APPLY_SUCCESS: '/apply-success',

  APPLY_FAIL: '/apply-fail',

  NOT_FOUND: '*',
} as const;

export const END_POINTS = {
  FOREIGNER_SIGN_UP: '/api/v1/members/sign-up/foreigner',
  COMPANY_SIGN_UP: '/api/v1/members/sign-up/company',
  COMPANY_SIGN_UP_VALIDATE: '/api/v1/members/sign-up/company/validate',
  SIGN_IN: '/api/v1/members/sign-in',
  SIGN_OUT: '/api/v1/members/sign-out',
  REFRESH: '/token/refresh',
};
