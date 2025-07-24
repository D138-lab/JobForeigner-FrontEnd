import { useMutation } from '@tanstack/react-query';
import { instance } from '@/lib/fetcher';
import { END_POINTS } from '@/lib/constants/routes';

export interface PostResumeRequest {
  resumeTitle: string;
  desiredJobs: { desiredJob: string }[];
  educations: {
    educationName: string;
    major: string;
    yearOfGraduation: string;
    degree: string;
    graduationStatus: string;
    etc?: string;
  }[];
  employments: {
    companyName: string;
    departmentName: string;
    jobTitle: string;
    startDate: string;
    endDate: string;
    achievement?: string;
  }[];
  certificates: {
    certificateName: string;
    organization: string;
    date: string;
  }[];
  awards: {
    awardName: string;
    organization: string;
    awardYear: string;
    details?: string;
  }[];
  skills: { skillName: string }[];
  languages: { languages: string; proficiency: string }[];
  portfolios: { portfolioTitle: string; portfolioUrl: string }[];
  jobPreference: {
    desiredEmploymentType: string;
    desiredSalary: number;
    desiredLocation: string;
  };
  expat: {
    country: string;
    startDate: string;
    endDate: string;
    experience?: string;
  }[];
  resumeImageUrl?: string;
}

const postResume = async (body: PostResumeRequest) => {
  const response = await instance.post('/api/v1/resumes', body);
  return response.data;
};

const usePostResume = () =>
  useMutation({
    mutationFn: postResume,
    mutationKey: ['postResume'],
    onSuccess: data => {
      console.log('이력서 생성 성공:', data);
      return data;
    },
    onError: error => {
      console.error('이력서 생성 실패:', error);
      return error;
    },
  });

export default usePostResume;
