import { LoginValues } from '@/lib/schemas/loginSchema';
import { getMyInfo } from '@/lib/apis/mutations/useGetMyInfo';
import { useAuthStore } from '@/lib/stores/useAuthStore';
import usePostSignin from '@/lib/apis/mutations/usePostSignin';

export const useAuth = () => {
  const {
    login,
    setName,
    setType,
    setPhoneNumber,
    setEmail,
    setProfileImageUrl,
    setAddress,
  } = useAuthStore();

  const signinMutation = usePostSignin();

  const loginAndFetchUser = async (values: LoginValues) => {
    await signinMutation.mutateAsync(values);
    login();

    const user = await getMyInfo();
    console.log('[useAuth] User Info:', user);

    setName(user.name);
    setType(user.type);
    setPhoneNumber(user.phoneNumber);
    setEmail(user.email);
    setProfileImageUrl(user.profile_image_url);
    setAddress(user.address);
  };

  return {
    loginAndFetchUser,
    ...signinMutation,
  };
};
