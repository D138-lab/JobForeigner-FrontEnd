import { END_POINTS } from '@/lib/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

interface BusinessInfo {
  b_no: string;
  start_dt?: string;
  p_nm?: string;
  p_nm2?: string;
  b_nm?: string;
  corp_no?: string;
  b_sector?: string;
  b_type?: string;
}

interface ValidateBusinessNumberRequest {
  businesses: BusinessInfo[];
}

const postValidateCompanyBusinessNumber = async (
  body: ValidateBusinessNumberRequest,
) => {
  return fetcher.post<{ success: boolean | string; data: null }>(
    END_POINTS.COMPANY_SIGN_UP_VALIDATE,
    body,
  );
};

const usePostValidateCompanyBusinessNumber = () =>
  useMutation({
    mutationFn: postValidateCompanyBusinessNumber,
    mutationKey: ['validateCompanyBusinessNumber'],
  });

export default usePostValidateCompanyBusinessNumber;
