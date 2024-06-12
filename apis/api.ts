import { AsType, BuildingType } from 'types/client.types';
import { instance } from './config/default';

export const getBuildings = async () => {
  const res = await instance.get('/building/infos');
  return res.data as BuildingType[];
};

export const getBuildingInfo = async (id: number) => {
  const res = await instance.get('/building/infos', { params: { id } });
  return res.data[0] as BuildingType;
};

export const getSearchResult = async (as: AsType, q: string) => {
  const parsedAs =
    as === '빌딩명' ? 'building' : as === '팝업명' ? 'popup' : 'address';
  const res = await instance.get('/building/search', {
    params: {
      as: parsedAs,
      q,
    },
  });
  return res.data as BuildingType[];
};
