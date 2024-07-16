import { create } from 'zustand';
import { MapSlice, createMapSlice } from './slice/mapSlice';
import { UserSlice, createUserSlice } from './slice/userSlice';

type SliceType = MapSlice & UserSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createMapSlice(...a),
  ...createUserSlice(...a),
}));
