import { populationDataFilter } from 'constants/populationDataFilter';
import { PopulationKeysType } from 'types/client.types';

export const populationDataSplitter = (
  populationData: string,
  category: PopulationKeysType,
) => {
  const splitPieces = populationData.split(populationDataFilter[category][0]);
  return splitPieces[1]?.split(populationDataFilter[category][1])[0];
};

const TIME_FILTER = ['<FCST_TIME>', '</FCST_TIME>'];
const PEOPLE_FILTER = ['<FCST_PPLTN_MAX>', '</FCST_PPLTN_MAX>'];

export const congestionDataSplitter = (congestionData: string) => {
  const splitTime = congestionData?.split(TIME_FILTER[0]);
  splitTime.shift();
  const time = splitTime.map((el) => el.split(TIME_FILTER[1])[0].split(' ')[1]);

  const splitValue = congestionData?.split(PEOPLE_FILTER[0]);
  splitValue.shift();
  const value = splitValue.map((el) => Number(el.split(PEOPLE_FILTER[1])[0]));

  return { time, value };
};
