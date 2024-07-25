import axios from 'axios';
import { HOT_PLACE_COORD } from 'constants/regions';
import {
  congestionDataSplitter,
  populationDataSplitter,
} from 'utils/populationDataSplitter';
import { PopulationKeysType, PopulationType } from 'types/client.types';
import { instance } from './config/default';

const MAX_LENGTH = 1500;

export const getPopulationData = async (
  coord: string[],
  startIndex: number = 1,
  endIndex: number = 5,
) => {
  let area: string | null = null;
  let minLength: number = MAX_LENGTH;
  for (const [key, value] of Object.entries(HOT_PLACE_COORD)) {
    const polyline = new window.kakao.maps.Polyline({
      path: [
        new window.kakao.maps.LatLng(coord[0], coord[1]),
        new window.kakao.maps.LatLng(value[0], value[1]),
      ],
    });
    const length = polyline.getLength();
    if (length <= MAX_LENGTH && length < minLength) {
      minLength = length;
      area = key;
    }
  }

  if (!area) {
    return false;
  }

  const response = await instance.get(`/data/area_info?area=${area}`);
  const data = response.data;

  const parsedPopulationData: PopulationType = {
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
    residentRate: '',
    noneResidentRate: '',
  };

  let key: PopulationKeysType;
  for (key in parsedPopulationData) {
    const content = populationDataSplitter(data, key);
    parsedPopulationData[key] = content;
  }

  const parsedCongestionData = congestionDataSplitter(data);

  return { ...parsedPopulationData, congestion: { ...parsedCongestionData } };
};
