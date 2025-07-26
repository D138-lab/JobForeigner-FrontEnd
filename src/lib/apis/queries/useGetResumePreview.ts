import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface MemberProfile {
  name: string;
  type: string;
  phoneNumber: string;
  email: string;
  profile_image_url: string;
  address: {
    address: string;
    detailAddress: string;
    zipcode: string;
  };
}

export interface ResumePreviewItem {
  resumeId: number;
  resumeTitle: string;
  memberProfile: MemberProfile;
  createdAt: string;
  updatedAt: string;
  desiredJobs: Array<{ desiredJob: string }>;
  educations: Array<{
    educationName: string;
    major: string;
    yearOfGraduation: string;
    degree: string;
    graduationStatus: string;
    etc: string;
  }>;
  employments: Array<{
    companyName: string;
    departmentName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    achievement: string;
  }>;
  certificates: Array<{
    certificateName: string;
    organization: string;
    date: string;
  }>;
  awards: Array<{
    awardName: string;
    organization: string;
    awardYear: string;
    details: string;
  }>;
  skills: Array<{
    skillName: string;
  }>;
  languages: Array<{
    languages: string;
    proficiency: string;
  }>;
  portfolios: Array<{
    portfolioTitle: string;
    portfolioUrl: string;
  }>;
  jobPreference: {
    desiredEmploymentType: string;
    desiredSalary: number;
    desiredLocation: string;
  };
  expats: Array<{
    country: string;
    startDate: string;
    endDate: string;
    experience: string;
  }>;
  imageUrl: string | null;
}

export interface GetResumePreviewResponse {
  success: boolean | string;
  data: ResumePreviewItem;
  code?: string;
  message?: string;
}

const useGetResumePreview = (resumeId: number | string) => {
  return useQuery({
    queryKey: ['resumePreview', resumeId],
    queryFn: () =>
      fetcher.get<GetResumePreviewResponse>(`/api/v1/resumes/${resumeId}`),
    enabled: !!resumeId,
  });
};

export default useGetResumePreview;
