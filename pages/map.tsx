import { SIGU } from 'constants/regions';
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
      const buildingMarkers: any[] = [];

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
            buildingMarkers.push(marker);
            marker.setMap(null);

            if (isLast) {
              window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
                const zoomLevel = map.getLevel();

                if (zoomLevel <= 6) {
                  buildingMarkers.forEach((marker) => {
                    marker.setMap(map);
                  });
                } else {
                  buildingMarkers.forEach((marker) => {
                    marker.setMap(null);
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

      const siguMarkers: any[] = [];
      const siguOverlays: any[] = [];

      for (const sigu in SIGU) {
        const coord = new window.kakao.maps.LatLng(
          SIGU[sigu as keyof typeof SIGU][0],
          SIGU[sigu as keyof typeof SIGU][1],
        );

        const marker = new window.kakao.maps.Marker({
          map,
          position: coord,
        });
        siguMarkers.push(marker);
        marker.setMap(map);

        const content =
          '<div class="relative w-fit bg-gray-300 px-12 py-8 text-black">' +
          sigu +
          '<div class="absolute -bottom-12 right-1/2 translate-x-1/2">' +
          '</div>' +
          '</div>';

        const customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          position: coord,
          content: content,
          yAnchor: 2,
        });
        siguOverlays.push(customOverlay);
        customOverlay.setMap(map);
      }

      window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const zoomLevel = map.getLevel();

        if (zoomLevel <= 6) {
          siguMarkers.forEach((marker) => {
            marker.setMap(null);
          });
          siguOverlays.forEach((overlay) => {
            overlay.setMap(null);
          });
        } else {
          siguMarkers.forEach((marker) => {
            marker.setMap(map);
          });
          siguOverlays.forEach((overlay) => {
            overlay.setMap(map);
          });
        }
      });
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
