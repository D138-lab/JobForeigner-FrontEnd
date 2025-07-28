import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

export interface CompanyType {
  companyId: number;
  companyName: string;
  description: string;
  address: string;
  employeeCount: number;
  imageUrl: string;
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

export const getAllCompanyInfo = async ({
  queryKey,
}: {
  queryKey: [string, string?, string?, string?];
}) => {
  const [, companyName = '', region = 'ALL', industryType = 'ALL'] = queryKey;

  const params = new URLSearchParams();

  if (companyName.trim() !== '') {
    params.append('companyName', companyName);
  }

  if (region.toUpperCase() !== 'ALL') {
    params.append('region', region);
  }

  if (industryType.toUpperCase() !== 'ALL' && industryType.trim() !== '') {
    params.append('industryType', industryType);
  }

  const queryString = params.toString();
  const url = `/api/v1/companies${queryString ? `?${queryString}` : ''}`;

  const response = await fetcher.get<{
    success: boolean;
    data: GetAllCompanyInfoResponse;
  }>(url);

  return response;
};

export const useGetAllCompanyInfo = (
  companyName: string = '',
  region: string = 'ALL',
  industryType: string = 'ALL',
) => {
  return useQuery({
    queryKey: ['useAllCompanyInfo', companyName, region, industryType],
    queryFn: getAllCompanyInfo,
    staleTime: 1000 * 60,
    enabled: false,
  });
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
