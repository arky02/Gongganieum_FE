import { instance } from './config/default';

// 회원가입
export const postUserSignUpInfo = async (props: {
  formData: {
    nickname: string;
    company: string;
    brand: string;
    description: string;
    interests?: string;
  };
}) => {
  const { formData } = props;
  const { nickname, company, brand, description, interests: tag } = formData;

  const response = await instance.put(`/user/guest/update`, {
    nickname,
    company,
    brand,
    tag,
    description,
  });
  const data: { accessToken: string } = response.data;

  return { resStatus: response.status, resData: data };
};

// 유저 ROLE 체크
export const requestUserRole = async () => {
  const userRoleRes = await instance.get(`/user/info/role`);
  return userRoleRes?.data?.user_role;
};

// 프로필 편집
export const putProfileEdit = async (props: {
  profileFormData: {
    nickname: string;
    company: string;
    brand: string;
    description: string;
    interests?: string;
    img?: File;
  };
}) => {
  const { profileFormData } = props;
  const {
    nickname,
    company,
    brand,
    interests: tag,
    description,
    img,
  } = profileFormData;

  const bodyData = JSON.stringify({
    nickname,
    company,
    brand,
    tag,
    description,
  });

  const formData = new FormData();
  formData.append('bodyData', bodyData);
  formData.append('file', img!);

  const response = await instance.put(`/user/info`, formData);

  return response?.status;
};

// 회원 탈퇴
export const deleteUser = async () => {
  const response = await instance.get(`/user/remove`);
  return response?.status;
};
