import { POPUP_MOCK_DATA, PopupType } from 'mock/popup';
import { ChangeEvent, useEffect, useState } from 'react';
import useKakaoMap from 'hooks/useKakaoMap';

const MapPage = () => {
  const [map, setMap] = useState<any>();

  const initMap = () => {
    window.kakao?.maps?.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.53, 126.9786567),
        level: 7,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);

      const geocoder = new window.kakao.maps.services.Geocoder();
      const markers: any[] = [];

      const addBuildingMarker = (data: PopupType, isLast: boolean) => {
        geocoder.addressSearch(data.address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coord = new window.kakao.maps.LatLng(
              result[0].y,
              result[0].x,
            );

            const marker = new window.kakao.maps.Marker({
              map,
              position: coord,
            });
            markers.push(marker);
            marker.setMap(null);

            if (isLast) {
              window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
                console.log(map.getLevel());
                const zoomLevel = map.getLevel();

                if (zoomLevel <= 6) {
                  markers.forEach((marker) => {
                    marker.setMap(map);
                    console.log(marker);
                  });
                } else {
                  markers.forEach((marker) => {
                    marker.setMap(null);
                    console.log(marker);
                  });
                }
              });
            }
          }
        });
      };

      for (let i = 0; i < POPUP_MOCK_DATA.length; i++) {
        addBuildingMarker(POPUP_MOCK_DATA[i], i === POPUP_MOCK_DATA.length - 1);
      }
    });
  };
  useKakaoMap({ callbackFn: initMap });

  const [address, setAddress] = useState('');

  const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const handleClick = () => {
    if (!map) {
      return;
    }

    const placeService = new window.kakao.maps.services.Places();

    placeService.keywordSearch(address, (data: any, status: any) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      }
    });
  };

  return (
    <>
      <div className='relative h-screen w-screen'>
        <div className='fixed left-0 top-0 z-floating h-44 w-240 bg-green-700 p-8'>
          <input onChange={handleAddressChange} className='h-full' />
          <button onClick={handleClick} className='ml-4 h-full w-40 bg-red-500'>
            검색
          </button>
        </div>
        <div id='map' className='h-full w-full' />
      </div>
    </>
  );
};

export default MapPage;
