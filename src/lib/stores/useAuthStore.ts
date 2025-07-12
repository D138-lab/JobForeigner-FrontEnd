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
}

interface AuthStateActions {
  login: () => void;
  logout: () => void;
  setName: (name: string) => void;
  setType: (type: UserType) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmail: (email: string) => void;
  setProfileImageUrl: (url: string) => void;
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

      login: () => set({ isLoggedIn: true }),
      logout: () =>
        set({
          isLoggedIn: false,
          name: '',
          type: 'NONE',
          phoneNumber: '',
          email: '',
          profileImageUrl: '',
        }),

      setName: name => {
        console.log('[setName]', name);
        set({ name });
      },
      setType: type => set({ type }),
      setPhoneNumber: phoneNumber => set({ phoneNumber }),
      setEmail: email => set({ email }),
      setProfileImageUrl: url => set({ profileImageUrl: url }),
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        isLoggedIn: state.isLoggedIn,
        name: state.name,
        type: state.type,
        phoneNumber: state.phoneNumber,
        email: state.email,
        profileImageUrl: state.profileImageUrl,
      }),
    },
  ),
);
