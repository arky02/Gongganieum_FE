import { FormValues } from 'components/modals/ProfileModal';
import { instance } from './config/default';

// 회원가입
export const postUserSignUpInfo = async (props: {
  formData: FormValues & { interests: string };
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
  return { resStatus: response.status, resData: response.data };
};

// 유저 ROLE 체크
export const requestUserRole = async () => {
  const userRoleRes = await instance.get(`/user/info/role`);
  return userRoleRes?.data?.user_role;
};
