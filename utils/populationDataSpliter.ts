import { populationDataFilter } from 'constants/populationDataFilter';

type PopulationDataFilterKeysType = keyof typeof populationDataFilter;

export const populationDataSpliter = (
  populationData: string,
  category: PopulationDataFilterKeysType,
  callback: (arg0: string) => void,
) => {
  const areaNameSplit = populationData.split(populationDataFilter[category][0]);
  if (areaNameSplit.length > 1) {
    callback(areaNameSplit[1].split(populationDataFilter[category][1])[0]);
  } else {
    callback('');
  }
};
