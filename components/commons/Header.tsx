import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { IconHambugerMenu, IconLogo, IconSearch } from 'public/icons';
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
];

const Header = () => {
  return (
    <header className='sticky top-0 z-nav h-72 w-full border-b border-[#000]/5 bg-white'>
      <div className='m-auto flex h-full max-w-1224 items-center justify-between px-16'>
        <Link href='/' className='h-32 w-120 md:h-24 md:w-100'>
          <IconLogo />
        </Link>
        {/* <div className='flex h-full gap-60'>
          {TABS.map((tab) => (
            <TabButton key={tab.name} path={tab.path} href={tab.href}>
              {tab.name}
            </TabButton>
          ))}
        </div> */}
        <div className='flex items-center gap-12'>
          <div className='md: hidden'>
            <SearchBar />
          </div>
          <Link href='/' className='hidden h-28 w-28 md:inline'>
            <IconHambugerMenu />
          </Link>
          <Link href='/list' className='hidden md:inline'>
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
