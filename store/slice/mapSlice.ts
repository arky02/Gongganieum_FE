import { StateCreator } from 'zustand';

export interface MapSlice {
  map: any;
  setMap: (map: any) => void;
}

export const createMapSlice: StateCreator<MapSlice> = (set) => ({
  map: null,
  setMap: (map) => set((state) => ({ ...state, map })),
});
