import { StateCreator } from 'zustand';

export interface UserSlice {
  userId: number;
  setUserId: (userId: number) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  userId: 118, // TODO: 유저 아이디 초기값 수정
  setUserId: (userId) => set((state) => ({ ...state, userId })),
  isLogin: false,
  setIsLogin: (isLogin) => set((state) => ({ ...state, isLogin })),
});
