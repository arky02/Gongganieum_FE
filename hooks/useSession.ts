import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';

const LOGIN_TIME = 3600 * 1000 * 3; // 3시간

const useSession = () => {
  const [cookie, setCookie, removeCookie] = useCookies(['access_token']);
  const router = useRouter();
  const queryClient = useQueryClient();

  const setSession = (accessToken: string, redirectUri?: string) => {
    const expiration = new Date(Date.now() + LOGIN_TIME);

    setCookie('access_token', accessToken, {
      secure: false,
      sameSite: 'lax',
      path: '/',
      expires: expiration,
    });

    redirectUri && router.push(redirectUri);
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
    queryClient.removeQueries({ queryKey: ['user'] });

    if (toastType === 'success') {
      toast.success(toastMessage);
    } else {
      toast.error(toastMessage);
    }

    router.push(redirectUri);
  };

  const getSession = () => {
    const access_token = cookie.access_token;
    return !!access_token;
  };

  return { setSession, removeSession, getSession };
};

export default useSession;
