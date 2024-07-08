import { BuildingDataType } from 'types/client.types';
import { instance } from './config/default';

export const getBuildingData = async (address: string) => {
  const addressCode = await getAddressCode(address);
  if (!addressCode) {
    return;
  }

  const res = await instance.get('/data/building_info', {
    params: addressCode,
  });
  const item = res.data?.response?.body?.items?.item;
  const data = Array.isArray(item) ? item[0] : item;

  const date = String(data?.useAprDay);
  const parsedDate =
    date.length > 3
      ? `${date?.slice(0, 4)}년 ${date?.slice(4, 6)}월 ${date?.slice(6, 8)}일`
      : null;

  const parsedData: BuildingDataType = {
    연면적: data?.totArea,
    용적률: data?.vlRat,
    건폐율: data?.bcRat,
    사용승인일: parsedDate,
    승강기: data?.rideUseElvtCnt,
    지상층수: data?.grndFlrCnt,
    지하층수: data?.ugrndFlrCnt,
    주용도: data?.mainPurpsCdNm,
    주차대수:
      data?.indrMechUtcnt +
      data?.oudrMechUtcnt +
      data?.indrAutoUtcnt +
      data?.oudrAutoUtcnt,
  };

  return parsedData;
};

const getAddressCode = async (address: string) => {
  const res = await instance.get(`/data/address_code?address=${address}`);
  const data = res.data.response;

  if (data.status !== 'OK') {
    return false;
  }

  const code: string = data.result.items[0].id;
  const sigunguCd = code.slice(0, 5);
  const bjdongCd = code.slice(5, 10);
  const bun = code.slice(11, 15);
  const ji = code.slice(15, 19);

  return { sigunguCd, bjdongCd, bun, ji };
};
