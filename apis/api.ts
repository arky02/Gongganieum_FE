import {
  AsType,
  BuildingType,
  CarouselType,
  CategoryType,
  ContactType,
  OrderType,
  UserDataType,
} from 'types/client.types';
import { instance } from './config/default';

// 건물 전체 조회
export const getBuildings = async () => {
  const res = await instance.get('/building/infos');
  return res.data as BuildingType[];
};

// 건물 리스트 조회 및 지도 검색창
export const getFilteredBuildings = async (params: {
  q?: string;
  order?: OrderType;
  cate?: CategoryType | '전체';
  as?: AsType;
  isours?: boolean;
  iscurrent?: boolean;
}) => {
  const { q, order, cate, as, isours, iscurrent } = params;
  const parsedAs =
    as === '빌딩명' ? 'building' : as === '팝업명' ? 'popup' : 'address';

  const res = await instance.get(`/building/search?`, {
    params: {
      q,
      order,
      cate,
      as: parsedAs,
      is_ours: isours,
      is_current: iscurrent,
    },
  });

  return res.data as { result: BuildingType[]; count?: number };
};

// 특정 건물 조회
export const getBuildingInfo = async (id: number) => {
  const res = await instance.get('/building/infos', { params: { id } });
  return res.data[0] as BuildingType;
};

// 찜하기
export const postLikeToggle = async (buildingId: number) => {
  await instance.post(`/user/building/likes`, {
    buildingId,
  });
};

// 찜한 건물 조회
export const getLikeBuildingIds = async () => {
  const res = await instance.get(`/user/building/likes`);
  return res.data?.buildingIdList as number[] | null;
};

// 유저 본인 정보 조회
export const getMyInfo = async () => {
  try {
    const res = await instance.get(`/user/info`);
    return res.data as UserDataType;
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw error;
  }
};

// 특정 유저 정보 조회
export const getUserInfo = async (userId: number) => {
  const res = await instance.get(`/user/info?id=${userId}`);
  return res.data as UserDataType;
};

// 문의하기
export const postBuildingContact = async (data: ContactType) => {
  const res = await instance.post('/contact', data);
  return res.data;
};

// 홈페이지 캐러셀 이미지 조회 (타입: 메인, 프라이머리, 세컨더리, 추천)
export const getHomeCarousel = async (
  type: 'main_banner' | 'primary' | 'secondary' | 'recommend_banner',
) => {
  const res = await instance.get(`/carousel/building/main?type=${type}`);
  return res.data as CarouselType[];
};

// 지도 페이지 추천 건물
export const getRecommendedBuildings = async () => {
  const res = await instance.get('/carousel/building/map');
  return res.data as CarouselType[];
};
