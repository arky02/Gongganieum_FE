import Link from 'next/link';
import { IconKakaoLogo, IconNaverLogo } from 'public/icons';

const MODE_OBJECT = {
  kakao: {
    content: '카카오',
    icon: <IconKakaoLogo />,
    backgroundColor: 'bg-[#FEE500]',
    textColor: 'text-black',
  },
  naver: {
    content: '네이버',
    icon: <IconNaverLogo />,
    backgroundColor: 'bg-[#03C75A]',
    textColor: 'text-white',
  },
};

const LoginButton = (props: { mode: 'naver' | 'kakao'; href: string }) => {
  const { mode, href } = props;

  return (
    <Link
      className={`flex h-56 w-full min-w-452 max-w-600  items-center justify-center gap-16 rounded-12 ${mode === 'kakao' ? MODE_OBJECT.kakao.backgroundColor : MODE_OBJECT.naver.backgroundColor} py-16 md:min-w-0 md:py-[14px]`}
      href={href}
    >
      {mode === 'kakao' ? MODE_OBJECT.kakao.icon : MODE_OBJECT.naver.icon}
      <div
        className={`text-18 font-800 ${mode === 'kakao' ? MODE_OBJECT.kakao.textColor : MODE_OBJECT.naver.textColor}`}
      >
        {mode === 'kakao'
          ? MODE_OBJECT.kakao.content
          : MODE_OBJECT.naver.content}
        로 시작하기
      </div>
    </Link>
  );
};

export default LoginButton;
