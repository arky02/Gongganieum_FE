import { StateCreator } from 'zustand';

export interface UserSlice {
  userId: number | null;
  setUserId: (userId?: number | null) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  userId: null, // TOOD: 타입 오류 참조를 통해서 알아내기
  setUserId: (userId) => set((state) => ({ ...state, userId })),
  isLogin: false,
  setIsLogin: (isLogin) => set((state) => ({ ...state, isLogin })),
});
