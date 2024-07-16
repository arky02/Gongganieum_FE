import { StateCreator } from 'zustand';

export interface UserSlice {
  userId: number | null;
  setUserId: (userId?: number | null) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  userId: null,
  setUserId: (userId) => set((state) => ({ ...state, userId })),
});
