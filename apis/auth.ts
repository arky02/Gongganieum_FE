import { SessionType } from 'hooks/useSession';
import { FormValues } from 'components/commons/modals/ProfileModal';
import { instance } from './config/default';

// 회원가입
export const postUserSignUpInfo = async (props: {
  formData: FormValues & { interests?: string };
}) => {
  const { formData } = props;
  const {
    nickname,
    companyName: company,
    brandName: brand,
    interests: tag,
    introduction: description,
  } = formData;

  const response = await instance.patch(`/user/guest/update`, {
    nickname,
    company,
    brand,
    tag,
    description,
  });
  const data: SessionType = response.data;

  return { resStatus: response.status, resData: data };
};

// 유저 ROLE 체크
export const requestUserRole = async () => {
  const userRoleRes = await instance.get(`/user/info/role`);
  return userRoleRes?.data?.user_role;
};

// 프로필 편집
export const patchProfileEdit = async (props: {
  formData: FormValues & { interests?: string };
}) => {
  const { formData } = props;
  const {
    nickname,
    companyName: company,
    brandName: brand,
    interests: tag,
    introduction: description,
  } = formData;
  const response = await instance.patch(`/user/guest/update`, {
    nickname,
    company,
    brand,
    tag,
    description,
  });

  return response?.status;
};
