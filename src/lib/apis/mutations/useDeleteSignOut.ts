import { END_POINTS } from '@/lib/constants/routes';
import { fetcher } from '@/lib/fetcher';
import { useMutation } from '@tanstack/react-query';

const signOut = async () => {
  return fetcher.delete<{ success: boolean | string; data: null }>(
    END_POINTS.SIGN_OUT,
  );
};

const useDeleteSignOut = () =>
  useMutation({
    mutationFn: signOut,
    mutationKey: ['signOut'],
  });

export default useDeleteSignOut;
