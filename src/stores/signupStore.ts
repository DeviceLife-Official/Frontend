import { create } from 'zustand';

type SignupAccountState = {
  email: string;
  password: string;
};

type SignupProfileState = {
  name: string;
  phone: string;
};

type SignupStoreState = {
  account: SignupAccountState;
  profile: SignupProfileState;
  isEmailVerified: boolean;
  setAccount: (account: SignupAccountState) => void;
  setProfile: (profile: SignupProfileState) => void;
  setIsEmailVerified: (value: boolean) => void;
  resetSignup: () => void;
};

export const useSignupStore = create<SignupStoreState>((set) => ({
  account: {
    email: '',
    password: '',
  },
  profile: {
    name: '',
    phone: '',
  },
  isEmailVerified: false,

  setAccount: (account) =>
    set(() => ({
      account,
    })),

  setProfile: (profile) =>
    set(() => ({
      profile,
    })),

  setIsEmailVerified: (value) =>
    set(() => ({
      isEmailVerified: value,
    })),

  resetSignup: () =>
    set(() => ({
      account: { email: '', password: '' },
      profile: { name: '', phone: '' },
      isEmailVerified: false,
    })),
}));

