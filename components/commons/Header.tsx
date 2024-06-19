import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useState } from 'react';
import { IconLogo } from 'public/icons';
import SearchInput from './SearchInput';

const TABS = [
  { name: '홈', path: '/', href: '/' },
  { name: '지도', path: '/map', href: '/map?as=지역명&q=' },
  { name: '리스트', path: '/list', href: '/list?as=지역명&q=' },
  { name: '매거진', path: '/magazine', href: '/magazine' },
];

const Header = () => {
  return (
    <header className='sticky top-0 z-nav h-72 w-full border-b border-[#000]/5 bg-white'>
      <div className='m-auto flex h-full max-w-1200 items-center justify-between'>
        <Link href='/'>
          <IconLogo />
        </Link>
        <div className='flex h-full gap-60'>
          {TABS.map((tab) => (
            <TabButton key={tab.name} path={tab.path} href={tab.href}>
              {tab.name}
            </TabButton>
          ))}
        </div>
        <SearchBar />
        <div>
          <Link href='/login'>로그인</Link>
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
    router.push({ pathname: '/list', query: { as: '빌딩명', q: value } });
  };

  return (
    <div className='w-240'>
      <SearchInput
        value={value}
        setValue={setValue}
        selectedMenu='빌딩명'
        onSubmit={handleSubmit}
        size='sm'
      />
    </div>
  );
};
