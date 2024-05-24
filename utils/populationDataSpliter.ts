import { populationDataFilter } from 'constants/populationDataFilter';
import { PopulationObjKeys, PopulationObjType } from 'types/client.types';

export const populationDataSpliter0 = (populationData: string) => {
  const ret: PopulationObjType = {
    areaName: '',
    updateTime: '',
    areaState: '',
    areaCongestionMessage: '',
    maleRate: '',
    femaleRate: '',
    ageTeenager: '',
    ageTwenties: '',
    ageThirties: '',
    ageForties: '',
    ageFifties: '',
    ageSixties: '',
  };
};

export const populationDataSpliter = (
  populationData: string,
  category: PopulationObjKeys,
) => {
  const splitFieces = populationData.split(populationDataFilter[category][0]);
  return splitFieces[1]?.split(populationDataFilter[category][1])[0];
};
