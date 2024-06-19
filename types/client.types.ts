export interface PopupType {
  name: string;
  date: string;
  type: string;
}

export interface BuildingType {
  _id: number;
  name: string;
  address: string;
  coord: string;
  popups: PopupType[];
  tag: string;
  cate: CategoryType;
  isours: boolean;
  latest_end_date: string;
}

export type CategoryType =
  | '패션'
  | '뷰티'
  | 'F&B'
  | '캐릭터'
  | '미디어'
  | '금융'
  | '예술'
  | '생활'
  | 'IT'
  | '기타';

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
