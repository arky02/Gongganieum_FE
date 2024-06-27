import axios from 'axios';
import { HOT_PLACE_COORD } from 'constants/regions';
import {
  congestionDataSplitter,
  populationDataSplitter,
} from 'utils/populationDataSplitter';
import { PopulationKeysType, PopulationType } from 'types/client.types';

const SECRET_KEY = process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY;
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

  const URL = `http://openapi.seoul.go.kr:8088/${SECRET_KEY}/xml/citydata_ppltn/${startIndex}/${endIndex}/${area}`;
  const response = await axios.get(URL);
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
