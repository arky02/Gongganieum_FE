import axios from 'axios';
import { BuildingDataType } from 'types/client.types';
import { instance } from './config/default';

const SERVICE_KEY = process.env.NEXT_PUBLIC_DATA_PORTAL_SERVICE_KEY;

export const getBuildingData = async (address: string) => {
  const addressCode = await getAddressCode(address);
  if (!addressCode) {
    return;
  }

  const res = await axios.get(
    `http://apis.data.go.kr/1613000/BldRgstService_v2/getBrTitleInfo?sigunguCd=${addressCode.sigunguCd}&bjdongCd=${addressCode.bjdongCd}&bun=${addressCode.bun}&ji=${addressCode.ji}&ServiceKey=${SERVICE_KEY}`,
  );
  const item = res.data?.response?.body?.items?.item;
  const data = Array.isArray(item) ? item[0] : item;

  const date = String(data?.useAprDay);
  const parsedDate =
    date !== 'undefined'
      ? `${date?.slice(0, 4)}년 ${date?.slice(4, 6)}월 ${date?.slice(6, 8)}일`
      : null;
  const parsedData: BuildingDataType = {
    연면적: data?.totArea,
    용적률: data?.vlRat,
    건폐율: data?.bcRat,
    사용승인일: parsedDate,
    승강기: data?.rideUseElvtCnt,
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
