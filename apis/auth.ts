import { FormValues } from 'components/modals/ProfileModal';
import { instance } from './config/default';

// 회원가입
export const postUserSignUpInfo = async ({
  formData,
  accessToken,
}: {
  formData: FormValues & { interests: string };
  accessToken: string;
}) => {
  const {
    nickname,
    companyName: company,
    brandName: brand,
    interests: tag,
    introduction: description,
  } = formData;

  const response = await instance.patch(
    `/user/guest/update`,
    {
      nickname,
      company,
      brand,
      tag,
      description,
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return { resStatus: response.status, resData: response.data };
};

export const requestUserRole = async (accessToken: string) => {
  const userRoleRes = await instance.get(`/user/info/role`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return userRoleRes?.data;
};

export const getUserRole = (accessToken: string) => {
  return {
    queryKey: ['userRole', accessToken],
    queryFn: () => requestUserRole(accessToken),
  };
};
