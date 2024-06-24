import axios from 'axios';
import { usePathname } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const OAuthProvider = () => {
  const router = useRouter();
  const { provider } = router.query;
  const params = useSearchParams();
  const code = params.get('code');
  console.log(provider);
  console.log(code);
  let response = '';

  const reqmsg = async () => {
    let response = '';
    try {
      response = await axios.get(
        `https://gongganieum.shop/api/${provider}/callback?code=${code}`,
      );

      console.log(response);
    } catch {
      alert('서버 오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
      return;
    }
    return response;
  };

  useEffect(() => {
    if (code) reqmsg();
    console.log(response);
  }, [code]);
};

export default OAuthProvider;
