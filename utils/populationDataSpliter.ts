import { populationDataFilter } from 'constants/populationDataFilter';
import { PopulationObjKeys, PopulationObjType } from 'types/client.types';

export const populationDataSpliter = (
  populationData: string,
  category: PopulationObjKeys,
) => {
  const splitPieces = populationData.split(populationDataFilter[category][0]);
  return splitPieces[1]?.split(populationDataFilter[category][1])[0];
};
