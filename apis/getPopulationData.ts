import axios from 'axios';

const SECRET_KEY = process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY;

export const getPopulationData = async (
  areaName: string,
  startIndex: number = 1,
  endIndex: number = 5,
) => {
  const URL = `http://openapi.seoul.go.kr:8088/${SECRET_KEY}/xml/citydata_ppltn/${startIndex}/${endIndex}/${areaName}`;
  const response = await axios.get(URL);
  return response.data;
};
