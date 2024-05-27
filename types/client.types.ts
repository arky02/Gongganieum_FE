export interface PopulationObjType {
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

export type PopulationObjKeysType = keyof PopulationObjType;
