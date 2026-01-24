import { create } from 'zustand';

type SignupAccountState = {
  email: string;
  password: string;
  isEmailVerified: boolean;
};

type SignupProfileState = {
  username: string;
  phoneNumber: string;
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
    isEmailVerified: false,
  },
  profile: {
    username: '',
    phoneNumber: '',
  },
  isEmailVerified: false,

  setAccount: (account) =>
    set(() => ({
      account,
      isEmailVerified: account.isEmailVerified,
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
      account: { email: '', password: '', isEmailVerified: false },
      profile: { username: '', phoneNumber: '' },
      isEmailVerified: false,
    })),
}));

