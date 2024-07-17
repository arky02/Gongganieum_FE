import { create } from 'zustand';
import { MapSlice, createMapSlice } from './slice/mapSlice';

type SliceType = MapSlice;

export const useStore = create<SliceType>()((...a) => ({
  ...createMapSlice(...a),
}));
