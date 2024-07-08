import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

const useManageUserAccessToken = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);
  const router = useRouter();

  const saveUserAccessToken = (props: { data: string; routePath?: string }) => {
    const { data, routePath } = props;
    const loginTime = 3600; //1시간
    const expiration = new Date(Date.now() + loginTime * 1000);
    setCookie('access_token', data, {
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: expiration,
    });
    routePath && router.push(routePath); // routePath로 리다이렉트
  };

  const removeUserAccessToken = ({ redirectUri }: { redirectUri: string }) => {
    removeCookie('access_token', { path: '/' });
    toast('로그아웃 되었습니다!');
    router.push(redirectUri);
  };

  const userAccessToken = cookie.access_token;

  return { userAccessToken, saveUserAccessToken, removeUserAccessToken };
};

export default useManageUserAccessToken;
