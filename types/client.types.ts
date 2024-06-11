export interface PopupType {
  name: string;
  address: string;
  date: string;
  building: string;
  type: string;
  keyword: string;
}

export interface BuildingType {
  _id: number;
  name: string;
  address: string;
  coord: string;
  iscurrent: number;
  popups: PopupType[];
}

export interface PopulationType {
  areaName: string;
  updateTime: string;
  areaState: string;
  areaCongestionMessage: string;
  maleRate: string;
  femaleRate: string;
  ageTeenager: string;
  ageTwenties: string;
  ageThirties: string;
  ageForties: string;
  ageFifties: string;
  ageSixties: string;
}

export type PopulationKeysType = keyof PopulationType;

export type AsType = '지역명' | '빌딩명' | '팝업명';
