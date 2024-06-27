import axios from 'axios';
import { populationDataSpliter } from 'utils/populationDataSpliter';
import { PopulationKeysType, PopulationType } from 'types/client.types';

const SECRET_KEY = process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY;

export const getPopulationData = async (
  areaName: string,
  startIndex: number = 1,
  endIndex: number = 5,
) => {
  const URL = [
    `http://openapi.seoul.go.kr:8088/${SECRET_KEY}/xml/citydata_ppltn/${startIndex}/${endIndex}/${areaName}`,
    'https://data.seoul.go.kr/SeoulRtd/pop_congest?hotspotNm=%EC%84%B1%EC%88%98%EC%B9%B4%ED%8E%98%EA%B1%B0%EB%A6%AC',
  ];
  const response = await axios.get(URL[0]);
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
    residentRate: '',
    noneResidentRate: '',
  };

  let key: PopulationKeysType;
  for (key in parsedData) {
    const content = populationDataSpliter(data, key);
    parsedData[key] = content;
  }

  const congestionRes = await axios.get(URL[1]);
  const congestionData = congestionRes.data?.[0];
  const time: string[] = congestionData?.time_cd?.split('|');
  const peopleValue: number[] = congestionData?.people_value
    ?.split('|')
    .map((el: string) => Number(el));

  return { ...parsedData, congestion: { time, value: peopleValue } };
};
