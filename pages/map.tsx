import { POPUP_MOCK_DATA } from 'mock/popup';
import { ChangeEvent, useEffect, useState } from 'react';
import useKakaoMap from 'hooks/useKakaoMap';

// import { searchAddress } from 'utils/searchAddress';

const MapPage = () => {
  const initMap = () => {
    const mapContainer = document.getElementById('map');
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.54, 126.9786567),
      level: 7,
    };
    new window.kakao.maps.Map(mapContainer, mapOption);
  };
  useKakaoMap({ callbackFn: initMap });

  const [address, setAddress] = useState('');

  const onAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const [coords, setCoords] = useState<any[]>([]);

  const getAddress = () => {};

  return (
    <>
      <div className='relative h-screen w-screen'>
        <div className='fixed left-0 top-0 z-floating h-44 w-240 bg-green-700 p-8'>
          <input onChange={onAddressChange} className='h-full' />
          <button onClick={getAddress} className='ml-4 h-full w-40 bg-red-500'>
            검색
          </button>
        </div>
        <div id='map' className='h-full w-full' />
      </div>
    </>
  );
};

export default MapPage;
