import KakaoLogoImg from '/public/images/KakaoLogo.svg';
import NaverLogoImg from '/public/images/NaverLogo.svg';

const LoginButton = (props: { mode: 'naver' | 'kakao' }) => {
  const { mode } = props;

  const modeObj = {
    kakao: {
      content: '카카오',
      icon: <KakaoLogoImg />,
      backgroundColor: 'bg-[#FEE500]',
    },
    naver: {
      content: '네이버',
      icon: <NaverLogoImg />,
      backgroundColor: 'bg-[#03C75A]',
    },
  };
  return (
    <button
      className={`flex h-56 w-600 items-center justify-center gap-16 rounded-xl ${mode === 'kakao' ? modeObj.kakao.backgroundColor : modeObj.naver.backgroundColor} px-216 py-16`}
    >
      {mode === 'kakao' ? modeObj.kakao.icon : modeObj.naver.icon}
      <div className='text-lg font-black'>
        {mode === 'kakao' ? modeObj.kakao.content : modeObj.naver.content}로
        시작하기
      </div>
    </button>
  );
};

export default LoginButton;
