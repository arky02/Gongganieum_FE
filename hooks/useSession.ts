import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import { RoleType } from 'types/client.types';

export interface SessionType {
  accessToken: string;
  name: string;
  role: RoleType;
}

const LOGIN_TIME = 3600 * 1000 * 3; // 3시간

const useSession = () => {
  const [cookie, setCookie, removeCookie] = useCookies([
    'session', // 유저 정보를 담는 쿠키
    'access_token', // 백엔드에서 받는 토큰을 담는 쿠키
  ]);
  const router = useRouter();

  const setSession = (data: SessionType, redirectUri?: string) => {
    const expiration = new Date(Date.now() + LOGIN_TIME);

    setCookie('access_token', data.accessToken, {
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: expiration,
    });
    setCookie('session', JSON.stringify(data), {
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: expiration,
    });

    redirectUri && router.push(redirectUri); // routePath로 리다이렉트
  };

  const removeSession = (props: {
    redirectUri: string;
    toastMessage?: string;
    toastType?: 'success' | 'error';
  }) => {
    const {
      redirectUri,
      toastMessage = '로그아웃 되었습니다!',
      toastType = 'success',
    } = props;

    removeCookie('access_token', { path: '/' });
    removeCookie('session', { path: '/' });
    if (toastType === 'success') {
      toast.success(toastMessage);
    } else {
      toast.error(toastMessage);
    }

    router.push(redirectUri);
  };

  const getSession = () => {
    const session: SessionType = cookie.session;
    if (!session) {
      return false;
    }
    return session;
  };

  return { setSession, removeSession, getSession };
};

export default useSession;
