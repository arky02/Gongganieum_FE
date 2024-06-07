import Link from 'next/link';

// TODO: 탭 링크 변경, 컴포넌트 채워넣기
const Header = () => {
  return (
    <div className='m-32 flex h-24 w-screen justify-around'>
      <div>
        <Link href='/'>로고 버튼</Link>
      </div>
      <div className='flex gap-60'>
        <Link href='/map'>Map</Link>
        <Link href='/buildings'>Buildings</Link>
        <Link href='/magazine'>Magazine</Link>
        <Link href='/mypage'>Mypage</Link>
      </div>
      <div>검색바 컴포넌트</div>
      <div>
        <Link href='/login'>로그인</Link>
      </div>
    </div>
  );
};

export default Header;
