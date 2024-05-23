import { useEffect } from 'react';

interface Props {
  callbackFn: () => void;
  deps?: any[];
}

const useKakaoMap = ({ callbackFn, deps = [] }: Props) => {
  useEffect(() => {
    const isScript = document.getElementById('mapScript');
    const mapScript = document.createElement('script');

    if (!isScript) {
      mapScript.id = 'mapScript';
      mapScript.async = true;
      mapScript.type = 'text/javascript';
      mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=clusterer,services`;
      document.head.appendChild(mapScript);
    }

    mapScript.addEventListener('load', () => {
      callbackFn();
    });

    if (isScript) {
      callbackFn();
    }

    return () => {
      mapScript.removeEventListener('load', callbackFn);
    };
  }, deps);
};

export default useKakaoMap;
