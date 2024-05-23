import { useEffect } from 'react';

interface Props {
  callbackFn?: () => void;
  deps?: any[];
}

const useKakaoMap = ({ callbackFn, deps = [] }: Props) => {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services,clusterer`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(callbackFn);
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => {
      mapScript.removeEventListener('load', onLoadKakaoMap);
    };
  }, []);
};

export default useKakaoMap;
