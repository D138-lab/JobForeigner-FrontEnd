import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

type UserType = 'NONE' | 'FOREIGNER' | 'COMPANY' | 'ADMIN';
type AddressType = {
  address: string;
  detailAddress: string;
  zipcode: string;
};

// Login Slice 관련 타입
interface LoginState {
  isLoggedIn: boolean;
}

interface LoginActions {
  login: () => void;
  logout: () => void;
}

type LoginSlice = LoginState & LoginActions;

// User Info Slice 관련 타입
interface UserInfoState {
  name: string;
  type: UserType;
  phoneNumber: string;
  email: string;
  profileImageUrl: string;
  address: AddressType;
}

interface UserInfoActions {
  setName: (name: string) => void;
  setType: (type: UserType) => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setEmail: (email: string) => void;
  setProfileImageUrl: (url: string) => void;
  setAddress: (addressObj: AddressType) => void;
}

type UserInfoSlice = UserInfoState & UserInfoActions;

interface AuthStore extends LoginSlice, UserInfoSlice {}

const createLoginSlice: StateCreator<AuthStore, [], [], LoginSlice> = set => ({
  isLoggedIn: false,
  login: () =>
    set(() => ({
      isLoggedIn: true,
    })),
  logout: () =>
    set(() => ({
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
    })),
});

const createUserInfoSlice: StateCreator<
  AuthStore,
  [],
  [],
  UserInfoSlice
> = set => ({
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
  setName: name => {
    console.log('[setName]', name);
    set({ name });
  },
  setType: type => set({ type }),
  setPhoneNumber: phoneNumber => set({ phoneNumber }),
  setEmail: email => set({ email }),
  setProfileImageUrl: url => set({ profileImageUrl: url }),
  setAddress: addressObj => set({ address: addressObj }),
});

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get, store) => ({
      ...createLoginSlice(set, get, store),
      ...createUserInfoSlice(set, get, store),
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
