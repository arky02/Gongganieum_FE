import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode } from 'react';
import { IconLogo } from 'public/icons';

const TABS = [
  { name: '홈', path: '/' },
  { name: '지도', path: '/map' },
  { name: '리스트', path: '/list' },
  { name: '매거진', path: '/magazine' },
];

const Header = () => {
  return (
    <header className='sticky top-0 z-nav h-72 w-full border-b border-[#000]/5'>
      <div className='m-auto flex h-full max-w-1200 items-center justify-between bg-white'>
        <Link href='/'>
          <IconLogo />
        </Link>
        <div className='flex h-full gap-60'>
          {TABS.map((tab) => (
            <TabButton key={tab.name} path={tab.path}>
              {tab.name}
            </TabButton>
          ))}
        </div>
        <div>검색바 컴포넌트</div>
        <div>
          <Link href='/login'>로그인</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

const TabButton = (props: { children: ReactNode; path: string }) => {
  const { children, path } = props;
  const router = useRouter();
  const currPath = router.pathname;

  return (
    <Link
      href={path}
      className={`flex h-full w-80 items-center justify-center text-16 font-600 ${currPath === path ? 'border-b-2 border-black' : ''}`}
    >
      {children}
    </Link>
  );
};
