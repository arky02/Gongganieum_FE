import { useEffect } from 'react';

interface Props {
  callbackFn: () => void;
  deps?: any[];
}

/**
 * 카카오맵 스크립트를 불러오는 함수
 * @param {function} parameter.callbackFn 스크립트 로드 이후에 부를 함수
 * @param {any[]?} parameter.deps useEffect dependency 배열
 */

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
