import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { IconHamburgerMenu, IconLogo, IconSearch } from 'public/icons';
import SearchInput from './SearchInput';

const TABS = [
  { name: '홈', path: '/', href: '/' },
  {
    name: '지도',
    path: '/map',
    href: '/map?as=지역명&q=&order=&cate=전체&isours=false',
  },
  {
    name: '리스트',
    path: '/list',
    href: '/list?as=지역명&q=&order=&cate=전체&isours=false',
  },
  { name: '매거진', path: '/magazine', href: '/magazine' },
  { name: '마이페이지', path: '/mypage', href: '/mypage' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger Menu Content */}
      {isOpen && (
        <>
          <div className='fixed top-64 z-[4] hidden w-full animate-slideDown flex-col items-start gap-32 bg-white p-20 md:flex'>
            {TABS.map((el) => (
              <Link
                key={el.name}
                href={el.href}
                onClick={() => setIsOpen(false)}
                className='text-gray-700 flex h-24 w-full items-center justify-center gap-12 text-16 font-500'
              >
                {el.name}
              </Link>
            ))}
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className='fixed bottom-0 left-0 z-[3] flex h-screen w-full items-end justify-center bg-[#32363e] bg-opacity-70'
          />
        </>
      )}
      {/* Content */}
      <header className='sticky top-0 z-nav h-72 w-full border-b border-[#000]/5 bg-white md:z-popup md:h-64'>
        <div className='m-auto flex h-full max-w-1224 items-center justify-between px-16'>
          <Link href='/' className='h-32 w-120 md:h-24 md:w-100'>
            <IconLogo />
          </Link>
          <div className='flex h-full gap-60 md:hidden'>
            {TABS.map((tab) => (
              <TabButton key={tab.name} path={tab.path} href={tab.href}>
                {tab.name}
              </TabButton>
            ))}
          </div>
          <div className='flex items-center gap-12'>
            <div className='md:hidden'>
              <SearchBar />
            </div>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className='hidden h-28 w-28 md:inline'
            >
              <IconHamburgerMenu />
            </button>
            <Link
              href='/list?as=지역명&q=&order=&cate=전체&isours=false'
              className='hidden md:inline'
            >
              <IconSearch />
            </Link>
            <Link
              href='/login'
              className='flex h-40 w-68 shrink-0 items-center justify-center rounded-8 bg-black text-14 font-600 text-white'
            >
              로그인
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

const TabButton = (props: {
  children: ReactNode;
  path: string;
  href: string;
}) => {
  const { children, path, href } = props;
  const router = useRouter();
  const currPath = router.pathname;

  return (
    <Link
      href={href}
      className={`flex h-full w-80 items-center justify-center text-16 font-600 ${currPath === path ? 'border-b-2 border-black' : ''}`}
    >
      {children}
    </Link>
  );
};

const SearchBar = () => {
  const [value, setValue] = useState('');
  const router = useRouter();

  const handleSubmit = (value: string) => {
    router.push({ pathname: '/list', query: { as: '지역명', q: value } });
  };

  return (
    <div className='w-240 md:w-full'>
      <SearchInput
        value={value}
        setValue={setValue}
        placeholder='지역명을 입력해보세요.'
        onSubmit={handleSubmit}
        size='sm'
      />
    </div>
  );
};
