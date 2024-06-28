import { AsType, BuildingType } from 'types/client.types';
import { instance } from './config/default';

// 건물 전체 조회
export const getBuildings = async () => {
  const res = await instance.get('/building/infos');
  return res.data as BuildingType[];
};

// 건물 리스트 조회
export const getFilteredBuildings = async (params: {
  q?: string;
  order?: 'new' | 'popular' | 'likes';
  cate?:
    | '전체'
    | '패션'
    | '뷰티'
    | 'F&B'
    | '캐릭터'
    | '미디어'
    | '예술'
    | '기타';
  isours?: boolean;
  as?: '팝업명' | '빌딩명';
}) => {
  const { q, order, cate, isours, as } = params;
  const parsedAs =
    as === '빌딩명' ? 'building' : as === '팝업명' ? 'popup' : 'address';

  let path = `/building/search?`;
  const res = await instance.get(path, {
    params: { q, order, cate, isours, as: parsedAs },
  });

  return res.data as BuildingType[];
};

// 특정 건물 조회
export const getBuildingInfo = async (id: number) => {
  const res = await instance.get('/building/infos', { params: { id } });
  return res.data[0] as BuildingType;
};

// 지도 검색창
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

// 찜하기
export const postLikeToggle = async (userId: number, buildingId: number) => {
  await instance.post(`/user/building/likes?user=${userId}&id=${buildingId}`);
};
