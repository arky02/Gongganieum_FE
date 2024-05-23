import { POPUP_MOCK_DATA } from 'mock/popup';
import { ChangeEvent, useEffect, useState } from 'react';
import { searchAddress } from 'utils/searchAddress';

const MapPage = () => {
  const [map, setMap] = useState<naver.maps.Map>();

  const initMap = () => {
    const map = new window.naver.maps.Map('map', {
      // center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 11,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      logoControl: false,
      tileSpare: 10,
      tileTransition: false,
    });

    setMap(map);
  };

  useEffect(() => {
    initMap();
  }, []);

  const [address, setAddress] = useState('');

  const onAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const [coords, setCoords] = useState<any[]>([]);

  const getAddress = () => {
    console.log(coords);
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    POPUP_MOCK_DATA.forEach((data) => {
      searchAddress(data.address, (status, response) => {
        setCoords((prev) => [...prev, response.v2.addresses[0]]);

        const position = new naver.maps.LatLng(
          Number(response.v2.addresses[0].y),
          Number(response.v2.addresses[0].x),
        );

        const marker = new naver.maps.Marker({
          position: position,
          map: map,
        });
      });
    });
  }, [map]);

  return (
    <div className='relative h-screen w-screen'>
      <div className='fixed left-0 top-0 z-floating h-44 w-240 bg-green-700 p-8'>
        <input onChange={onAddressChange} className='h-full' />
        <button onClick={getAddress} className='ml-4 h-full w-40 bg-red-500'>
          검색
        </button>
      </div>
      <div id='map' className='h-full w-full' />
    </div>
  );
};

export default MapPage;
