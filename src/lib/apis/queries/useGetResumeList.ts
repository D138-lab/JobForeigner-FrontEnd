import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface ResumeListItem {
  resumeId: number;
  resumeTitle: string;
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
  imageUrl: string;
}

interface GetResumeListResponse {
  success: boolean;
  data: {
    content: ResumeListItem[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        sorted: boolean;
        empty: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  };
  code?: string;
  message?: string;
}

interface UseGetResumeListParams {
  page?: number;
  size?: number;
  sort?: string[];
}

const useGetResumeList = ({
  page = 0,
  size = 10,
  sort = ['updatedAt,DESC'],
}: UseGetResumeListParams = {}) => {
  const sortQuery = sort.map(s => `sort=${encodeURIComponent(s)}`).join('&');
  const queryString = `page=${page}&size=${size}${
    sortQuery ? `&${sortQuery}` : ''
  }`;

  return useQuery({
    queryKey: ['resumes', page, size, sort],
    queryFn: () =>
      fetcher.get<GetResumeListResponse>(`/api/v1/resumes?${queryString}`),
  });
};

export default useGetResumeList;
