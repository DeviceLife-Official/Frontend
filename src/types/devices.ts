import { type CombinationName, type CombinationStatus } from '@/constants/combination';

export type AuthStatus = 'logout' | 'login';
export type ModalView = 'device' | 'combination' | 'combinationDetail';

export type CombinationTagType = {
  name: CombinationName;
  status: CombinationStatus;
};

export type UserCombination = {
  id: number;
  label: string;
  name: string;
  isMain: boolean;
  createdAt?: string;
  tags: CombinationTagType[];
};
