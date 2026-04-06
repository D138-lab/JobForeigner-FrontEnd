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

export interface CompanyInfoDto {
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
  salary?: string;
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

export interface GetCompanyDetailInfoResponse {
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
  queryKey: [string, string?, string?, string?, number?, number?];
}) => {
  const [
    ,
    companyName = '',
    region = 'ALL',
    industryType = 'ALL',
    page = 0,
    size = 10,
  ] = queryKey;

  const params = new URLSearchParams();
  params.append('page', page.toString());
  params.append('size', size.toString());

  if (companyName.trim() !== '') {
    params.append('companyName', companyName);
  }

  if (region.toUpperCase() !== 'ALL') {
    params.append('region', region);
  }

  if (industryType.toUpperCase() !== 'ALL' && industryType.trim() !== '') {
    params.append('category', industryType);
  }

  const queryString = params.toString();
  const url = `/api/v1/companies${queryString ? `?${queryString}` : ''}`;

  console.log('[companies] list request', {
    companyName,
    region,
    industryType,
    url,
    accessTokenExists: !!window.localStorage.getItem('accessToken'),
  });

  try {
    const response = await fetcher.get<{
      success: boolean;
      data: GetAllCompanyInfoResponse;
    }>(url);

    console.log('[companies] list response', {
      url,
      pageSize: response.data?.pageSize,
      totalElements: response.data?.totalElements,
    });

    return response;
  } catch (error) {
    console.error('[companies] list error', {
      url,
      error,
      response: (error as { response?: unknown }).response,
    });
    throw error;
  }
};

export const useGetAllCompanyInfo = (
  companyName: string = '',
  region: string = 'ALL',
  industryType: string = 'ALL',
  page: number = 0,
  size: number = 10,
  enabled: boolean = true,
) => {
  return useQuery({
    queryKey: ['useAllCompanyInfo', companyName, region, industryType, page, size],
    queryFn: getAllCompanyInfo,
    staleTime: 1000 * 60,
    enabled,
  });
};

export const useGetCompanyDetailInfo = (companyId: number) => {
  return {
    ...useQuery({
      queryKey: ['useGetCompanyDetailInfo', companyId],
      queryFn: async () => {
        const url = `/api/v1/companies/${companyId}`;
        console.log('[companies] detail request', {
          companyId,
          url,
          accessTokenExists: !!window.localStorage.getItem('accessToken'),
        });

        try {
          const res = await fetcher.get<{
            success: boolean;
            data: GetCompanyDetailInfoResponse;
          }>(url);

          console.log('[companies] detail response', {
            companyId,
            companyName: res.data?.companyInfoDto?.companyName,
          });

          return res;
        } catch (error) {
          console.error('[companies] detail error', {
            companyId,
            url,
            error,
            response: (error as { response?: unknown }).response,
          });
          throw error;
        }
      },
    }),
  };
};
