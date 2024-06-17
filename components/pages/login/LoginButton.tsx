import { IconKakaoLogo, IconNaverLogo } from 'public/icons';

const MODE_OBJECT = {
  kakao: {
    content: '카카오',
    icon: <IconKakaoLogo />,
    backgroundColor: 'bg-[#FEE500]',
  },
  naver: {
    content: '네이버',
    icon: <IconNaverLogo />,
    backgroundColor: 'bg-[#03C75A]',
  },
};

const LoginButton = (props: { mode: 'naver' | 'kakao' }) => {
  const { mode } = props;

  return (
    <button
      className={`rounded-12 flex h-56 w-600 items-center justify-center gap-16 ${mode === 'kakao' ? MODE_OBJECT.kakao.backgroundColor : MODE_OBJECT.naver.backgroundColor} px-216 py-16`}
    >
      {mode === 'kakao' ? MODE_OBJECT.kakao.icon : MODE_OBJECT.naver.icon}
      <div className='text-18 font-800 font-black'>
        {mode === 'kakao'
          ? MODE_OBJECT.kakao.content
          : MODE_OBJECT.naver.content}
        로 시작하기
      </div>
    </button>
  );
};

export default LoginButton;
