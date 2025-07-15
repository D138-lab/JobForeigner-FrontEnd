import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface CompanyType {
  companyId: number;
  companyName: string;
  description: string;
  address: string;
  employeeCount: number;
}

export interface GetAllCompanyInfoResponse {
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  pageSort: string;
  pageContents: CompanyType[];
}

interface CompanyInfoDto {
  companyId: number;
  companyName: string;
  employeeCount: number;
  address: string;
  category: string;
  url: string;
  ceoName: string;
  description: string;
  welfare: string;
}

export interface JobPostDto {
  jobPostId: number;
  title: string;
  location: string;
  employmentType: string;
  career: string;
  expiryAt: Date;
}

interface SalaryInfoDto {
  averageSalary: string;
  monthlySalary: string;
}

export interface CompanyRatingDto {
  companyId: number;
  averageSalarySatisfaction: number;
  averageWorkLifeBalance: number;
  averageOrganizationalCulture: number;
  averageWelfare: number;
  averageJobStability: number;
  averageRating: number;
  totalReviews: number;
}

export interface ReviewDto {
  ratingId: number;
  salarySatisfaction: number;
  salaryComment: string;
  workLifeBalance: number;
  workLifeComment: string;
  organizationalCulture: number;
  cultureComment: string;
  welfare: number;
  welfareComment: string;
  jobStability: number;
  stabilityComment: string;
  reviewerName: string;
}

interface GetCompanyDetailInfoResponse {
  companyInfoDto: CompanyInfoDto;
  jobPostDto: JobPostDto[];
  salaryInfoDto: SalaryInfoDto;
  companyRatingDto: CompanyRatingDto;
  reviewDto: ReviewDto[];
  imageUrl: string;
}

interface GetCompanyQueryParams {
  companyName?: string;
  region?: string;
  jobType?: string;
  page?: number;
  size?: number;
  sort?: string;
}

export const useGetAllCompanyInfo = (params?: GetCompanyQueryParams) => {
  return {
    ...useQuery({
      queryKey: ['useAllCompanyInfo', params],
      queryFn: async () => {
        const searchParams = new URLSearchParams();

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              searchParams.append(key, String(value));
            }
          });
        }

        const queryString = searchParams.toString();

        const res = await fetcher.get<{
          success: boolean;
          data: GetAllCompanyInfoResponse;
        }>(`/api/v1/companies${queryString ? `?${queryString}` : ''}`);

        if (!res) {
          throw new Error('No data returned from API');
        }

        return res;
      },
    }),
  };
};

export const useGetCompanyDetailInfo = (companyId: number) => {
  return {
    ...useQuery({
      queryKey: ['useGetCompanyDetailInfo', companyId],
      queryFn: async () => {
        const res = await fetcher.get<{
          success: boolean;
          data: GetCompanyDetailInfoResponse;
        }>(`api/v1/companies/${companyId}`);
        return res;
      },
    }),
  };
};
