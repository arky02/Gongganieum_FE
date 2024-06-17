import LoginButton from './LoginButton';

const LoginBox = () => {
  return (
    <div className='rounded-16 flex w-768 flex-col items-center justify-center gap-36 bg-white px-84 py-64'>
      <div className='text-32 font-800'>공간이음 로그인</div>
      <div className='flex flex-col gap-20'>
        <LoginButton mode='kakao' />
        <LoginButton mode='naver' />
      </div>
      <span className='text-16 flex flex-col items-center text-center text-gray-300'>
        아직 공간이음 회원이 아니신가요? <br />
        소셜 로그인을 통해 빠르게 로그인 해보세요.
      </span>
    </div>
  );
};

export default LoginBox;
