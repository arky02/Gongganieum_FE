import { postPopupType } from 'components/pages/admin/contents/CreatePopup';
import { instance } from './config/default';

// 새 빌딩 정보 추가
export const postNewBuildingData = async (newBuildingFormData: FormData) => {
  const res = await instance.post('/admin/save/building', newBuildingFormData);
  return res;
};

// 새 팝업 정보 추가
export const postNewPopupData = async (newPopupData: postPopupType) => {
  const res = await instance.post('/admin/save/popup', newPopupData);
  return res;
};

export const authorizeAdmin = async (pwd: string) => {
  const res = await instance.post('/admin/authorize', pwd);
  return res.status;
};
