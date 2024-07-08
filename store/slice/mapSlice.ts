import { StateCreator } from 'zustand';

export interface MapSlice {
  map: any;
  setMap: (map: any) => void;
  showMarkers: (() => void) | null;
  setShowMarkers: (f: () => void) => void;
  hideMarkers: (() => void) | null;
  setHideMarkers: (f: () => void) => void;
}

export const createMapSlice: StateCreator<MapSlice> = (set) => ({
  map: null,
  setMap: (map) => set((state) => ({ ...state, map })),
  showMarkers: null,
  setShowMarkers: (showMarkers) => set((state) => ({ ...state, showMarkers })),
  hideMarkers: null,
  setHideMarkers: (hideMarkers) => set((state) => ({ ...state, hideMarkers })),
});
