import LoginButton from './LoginButton';

const LoginBoxContainer = () => {
  return (
    <div className='flex w-768 flex-col items-center justify-center gap-36 rounded-2xl border-2 border-solid px-84 py-64'>
      <div className='text-[32px] font-extrabold'>공간이음 로그인</div>
      <div className='flex flex-col gap-20'>
        <LoginButton mode='kakao' />
        <LoginButton mode='naver' />
      </div>
      <div className='flex flex-col items-center font-medium	text-[#6E7987]'>
        <span>아직 공간이음 회원이 아니신가요?</span>
        <span>소셜 로그인을 통해 빠르게 로그인 해보세요.</span>
      </div>
    </div>
  );
};

export default LoginBoxContainer;
