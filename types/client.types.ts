export interface PopulationObjType {
  areaName: string;
  updateTime: string;
  areaState: string;
  areaCongestionMessage: string;
  maleRate: number;
  femaleRate: number;
  ageTeenager: number;
  ageTwenties: number;
  ageThirties: number;
  ageForties: number;
  ageFifties: number;
  ageSixties: number;
}

export type PopulationObjKeys = keyof PopulationObjType;
