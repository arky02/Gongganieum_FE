import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useManageUserAccessToken from 'hooks/useManageAccessToken';

const OAuthProvider = () => {
  const router = useRouter();
  const { provider } = router.query;
  const params = useSearchParams();
  const code = params.get('code');

  const { saveUserAccessToken } = useManageUserAccessToken();

  const getAccessTokenFromOAuth = async () => {
    let oauthLoginRes: { accessToken: string; name: string; role: string };
    try {
      const { data: oauthLoginRes } = await axios.get(
        `https://gongganieum.shop/api/oauth/callback?code=${code}&provider=${provider}`,
      );

      if (!oauthLoginRes) throw Error('OAuth AccessToken Response Error');
      // => OAuth 서버로부터 받은 Response 존재!

      // cookie에 accessToken 정보 저장
      saveUserAccessToken({ data: oauthLoginRes?.accessToken });

      redirectByUserRole({
        role: oauthLoginRes.role,
        name: oauthLoginRes.name,
      });
    } catch {
      alert('서버 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
  };

  const redirectByUserRole = ({
    role,
    name,
  }: {
    role: string;
    name: string;
  }) => {
    // 1. ROLE: USER -> 이미 가입된 회원인 경우, /로 리다이렉트
    if (role === 'USER') {
      router.push('/');
      toast.success(
        `${name}님, ${provider === 'kakao' ? '카카오' : '네이버'}로 로그인 되었습니다!`,
      );
    } else {
      // 2. ROLE: GUEST -> 회원가입 필요
      toast.success(`${name}님, 추가정보 입력을 위해 이동합니다!`);
      router.push('/');
    }
  };

  useEffect(() => {
    if (code) getAccessTokenFromOAuth();
  }, [code]);
};

export default OAuthProvider;
