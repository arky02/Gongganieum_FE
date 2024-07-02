import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

const useManageUserAccessToken = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);
  const router = useRouter();

  const saveUserAccessToken = ({
    data,
    message,
    routePath,
  }: {
    data: string;
    message?: string;
    routePath?: string;
  }) => {
    const loginTime = 3600; //1시간
    const expiration = new Date(Date.now() + loginTime * 1000);
    setCookie('access_token', data, {
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: expiration,
    });
    setTimeout(() => {
      toast('세션이 만료되었습니다. 다시 로그인 해 주세요.');
      window.location.reload();
    }, loginTime * 1000);
    message &&
      setTimeout(
        () =>
          toast.success(message, {
            id: '로그인 완료',
            style: {
              borderRadius: '999px',
            },
          }),
        1000,
      ); // 1초 뒤에 리다이렉트 된 후 toast 띄움
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
