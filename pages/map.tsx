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
    const map = new window.kakao.maps.Map(mapContainer, mapOption);

    const geocoder = new window.kakao.maps.services.Geocoder();

    POPUP_MOCK_DATA.forEach((data) => {
      geocoder.addressSearch(data.address, (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
          marker.setMap(map);
        }
      });
    });
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
