import { populationDataFilter } from 'constants/populationDataFilter';
import { PopulationDataFilterKeysType } from 'types/client.types';

export const populationDataSpliter = (
  populationData: string,
  category: PopulationDataFilterKeysType,
) => {
  const areaNameSplit = populationData.split(populationDataFilter[category][0]);
  return areaNameSplit[1].split(populationDataFilter[category][1])[0];
};
