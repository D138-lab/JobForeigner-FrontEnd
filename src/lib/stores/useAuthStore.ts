import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserType = 'NONE' | 'FOREIGNER' | 'COMPANY' | 'ADMIN';

interface AuthStateValues {
  isLoggedIn: boolean;
  name: string;
  type: UserType;
  phoneNumber: string;
  email: string;
  profileImageUrl: string;
  address: {
    address: string;
    detailAddress: string;
    zipcode: string;
  };
}

interface AuthStateActions {
  login: () => void;
  logout: () => void;
  setName: (name: string) => void;
  setType: (type: UserType) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmail: (email: string) => void;
  setProfileImageUrl: (url: string) => void;
  setAddress: (addressObj: {
    address: string;
    detailAddress: string;
    zipcode: string;
  }) => void;
}

export const useAuthStore = create<AuthStateValues & AuthStateActions>()(
  persist(
    set => ({
      isLoggedIn: false,
      name: '',
      type: 'NONE',
      phoneNumber: '',
      email: '',
      profileImageUrl: '',
      address: {
        address: '',
        detailAddress: '',
        zipcode: '',
      },

      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          name: '',
          type: 'NONE',
          phoneNumber: '',
          email: '',
          profileImageUrl: '',
          address: {
            address: '',
            detailAddress: '',
            zipcode: '',
          },
        }),

      setName: name => {
        console.log('[setName]', name);
        set({ name });
      },
      setType: type => set({ type }),
      setPhoneNumber: phoneNumber => set({ phoneNumber }),
      setEmail: email => set({ email }),
      setProfileImageUrl: url => set({ profileImageUrl: url }),
      setAddress: addressObj => set({ address: addressObj }),
    }),
    {
      name: 'my-info',
      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
        name: state.name,
        type: state.type,
        phoneNumber: state.phoneNumber,
        email: state.email,
        profileImageUrl: state.profileImageUrl,
        address: state.address,
      }),
    },
  ),
);
