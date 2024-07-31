import { useEffect, useState } from 'react';
import LoginButton from './LoginButton';

const LoginBox = () => {
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    const currUrl = window.location.href;
    if (currUrl.includes('localhost')) {
      setRedirectUrl('http://localhost:3000');
      return;
    }
    setRedirectUrl('https://www.gongganieum.com');
  }, []);

  return (
    <div className='flex w-768 flex-col items-center justify-center gap-36 rounded-16 bg-white px-84 py-64 md:w-full md:px-16'>
      <div className='text-32 font-800'>공간이음 로그인</div>
      <div className='flex w-full flex-col items-center justify-center gap-20'>
        <LoginButton
          mode='kakao'
          href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=10e27455bc8bc405be98a80e91415931&redirect_uri=${redirectUrl}/oauth/kakao`}
        />
        <LoginButton
          mode='naver'
          href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=8_nLWgqOkGlSkyVVYEGj&redirect_uri=${redirectUrl}/oauth/naver&state=null`}
        />
      </div>
      <span className='flex flex-col items-center text-center text-16 text-gray-300'>
        아직 공간이음 회원이 아니신가요? <br />
        소셜 로그인을 통해 빠르게 로그인 해보세요.
      </span>
    </div>
  );
};

export default LoginBox;
