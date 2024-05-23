import axios from 'axios';

const SECRET_KEY = process.env.NEXT_PUBLIC_SEOUL_PUBLIC_API_KEY;
// 테스트 주소
const URL = `http://openapi.seoul.go.kr:8088/${SECRET_KEY}/xml/citydata_ppltn/1/5/광화문·덕수궁`;

export const getPopulationData = async () => {
  const response = await axios.get(URL);
  return response;
};
