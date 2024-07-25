import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import useSession from 'hooks/useSession';

const OAuthProvider = () => {
  const router = useRouter();
  const { provider } = router.query;
  const params = useSearchParams();
  const code = params.get('code');

  const { setSession } = useSession();

  const getUserFromOAuth = async () => {
    try {
      const res = await axios.get(
        `https://gongganieum.shop/api/oauth/callback?code=${code}&provider=${provider}`,
      );
      const data = res.data;

      if (!data) throw Error('OAuth AccessToken Response Error');

      setSession(data.accessToken);
      redirectByUserRole({
        role: data.role,
        name: data.name,
      });
    } catch {
      alert('서버 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
    }
  };

  const redirectByUserRole = (props: { role: string; name: string }) => {
    const { role, name } = props;

    const toastMsg =
      role === 'USER'
        ? `${name}님, ${provider === 'kakao' ? '카카오' : '네이버'}로 로그인 되었습니다!`
        : `${name}님, 추가정보 입력을 위해 이동합니다!`;

    toast.success(toastMsg);
    router.push('/');
  };

  useEffect(() => {
    if (code) getUserFromOAuth();
  }, [code]);
};

export default OAuthProvider;
