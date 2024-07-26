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
  const {
    nickname,
    company: company,
    brand: brand,
    interests: tag,
    description: description,
  } = formData;

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
  formData: {
    nickname: string;
    company: string;
    brand: string;
    description: string;
    interests?: string;
    img?: File;
  };
}) => {
  const { formData } = props;
  const {
    nickname,
    company,
    brand,
    interests: tag,
    description,
    img,
  } = formData;

  const bodyData = JSON.stringify({
    nickname,
    company,
    brand,
    tag,
    description,
  });

  console.log('formData', formData);
  console.log('bodyData', bodyData);

  const formData2 = new FormData();
  formData2.append('bodyData', bodyData);
  formData2.append('file', img!);

  const response = await instance.put(`/user/info`, formData2);

  return response?.status;
};
