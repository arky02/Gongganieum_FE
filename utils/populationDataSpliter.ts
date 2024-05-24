import { populationDataFilter } from 'constants/populationDataFilter';
import { PopulationObjKeys } from 'types/client.types';

export const populationDataSpliter = (
  populationData: string,
  category: PopulationObjKeys,
) => {
  const splitFieces = populationData.split(populationDataFilter[category][0]);
  return splitFieces[1]?.split(populationDataFilter[category][1])[0];
};
