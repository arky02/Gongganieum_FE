import axios from 'axios';
import { populationDataSpliter } from 'utils/populationDataSpliter';
import { PopulationKeysType, PopulationType } from 'types/client.types';

const SECRET_KEY = process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY;

export const getPopulationData = async (
  areaName: string,
  startIndex: number = 1,
  endIndex: number = 5,
) => {
  const URL = `http://openapi.seoul.go.kr:8088/${SECRET_KEY}/xml/citydata_ppltn/${startIndex}/${endIndex}/${areaName}`;
  const response = await axios.get(URL);
  const data = response.data;

  const parsedData: PopulationType = {
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

  let key: PopulationKeysType;
  for (key in parsedData) {
    const content = populationDataSpliter(data, key);
    parsedData[key] = content;
  }

  return parsedData;
};
