import { fetcher } from '@/lib/fetcher';
import { useQuery } from '@tanstack/react-query';

interface GetSearchResponse {
  content: [
    {
      companyId: number;
      companyName: string;
      companyDescription: string;
      companyAddress: string;
      employeeCount: number;
      jobPostList: [
        {
          id: number;
          title: string;
          companyName: string;
          description: string;
          location: string;
          employment_type: string;
          salary: string;
          career: string;
          published: string;
          expiryAt: string;
          grade: string;
          isScrapped: boolean;
          imageList: string[];
        },
      ];
    },
  ];
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
}

const useGetSearch = (keyword: string, enabled = true) => {
  return {
    ...useQuery({
      queryKey: ['useGetSearch', keyword],
      queryFn: () =>
        fetcher.get<{ success: string; data: GetSearchResponse }>(
          `/search?keyword=${keyword}`,
        ),
      enabled,
    }),
  };
};

export default useGetSearch;
