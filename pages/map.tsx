import { POPUP_MOCK_DATA } from 'mock/popup';
import { ChangeEvent, useEffect, useState } from 'react';
import { searchAddress } from 'utils/searchAddress';

const MapPage = () => {
  const [map, setMap] = useState<naver.maps.Map>();

  const initMap = () => {
    const map = new window.naver.maps.Map('map', {
      center: new naver.maps.LatLng(37.52, 127),
      zoom: 12,
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

  const setMarkers = () => {
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
  };

  useEffect(() => {
    if (map) {
      return;
    }

    initMap();
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    setMarkers();
  }, [map]);

  const [address, setAddress] = useState('');

  const onAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const [coords, setCoords] = useState<any[]>([]);

  const getAddress = () => {
    if (!map) {
      return;
    }

    searchAddress(address, (status, response) => {
      console.log(response);
      if (response.v2.addresses.length === 0) {
        console.log('결과가 없습니다.');
        return;
      }
      const point = new naver.maps.Point(
        Number(response.v2.addresses[0].x),
        Number(response.v2.addresses[0].y),
      );
      console.log(point);
      map.setCenter(point);
    });
  };

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
