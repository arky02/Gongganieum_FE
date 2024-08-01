import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { useCookies } from 'react-cookie';

const PRESERVE_TIME = 6000; // 1분

const usePreserveScroll = () => {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies([
    'scroll_positions',
    'is_back',
  ]);

  useEffect(() => {
    router.beforePopState(() => {
      const expiration = new Date(Date.now() + PRESERVE_TIME);
      setCookie('is_back', true, {
        secure: false,
        sameSite: 'lax',
        path: '/',
        expires: expiration,
      });
      return true;
    });

    const handleRouteChangeStart = () => {
      const url = router.pathname;
      const newScrollPositions = {
        ...cookie?.scroll_positions,
        [url]: window.scrollY,
      };

      const expiration = new Date(Date.now() + PRESERVE_TIME);
      setCookie('scroll_positions', newScrollPositions, {
        secure: false,
        sameSite: 'lax',
        path: '/',
        expires: expiration,
      });
    };

    const handleRouteChangeComplete = (url: string) => {
      const scrollPositions = cookie?.scroll_positions;
      const isBack = cookie?.is_back;
      if (isBack && scrollPositions[url]) {
        window.scroll({
          top: scrollPositions[url],
          behavior: 'auto',
        });
      }
      removeCookie('is_back');
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);
};

export default usePreserveScroll;
