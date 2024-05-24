import axios from 'axios';
import { GUNGU, GunguType } from 'constants/regions';
import { POPUP_MOCK_DATA, PopupType } from 'mock/popup';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import useKakaoMap from 'hooks/useKakaoMap';

const MapPage = () => {
  const [map, setMap] = useState<any>();

  const initMap = () => {
    window.kakao?.maps?.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.53, 126.9786567),
        level: 8,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);

      const geocoder = new window.kakao.maps.services.Geocoder();
      const buildingMarkers: any[] = [];
      const buildingsInRegion = {
        강남구: 0,
        강동구: 0,
        강북구: 0,
        강서구: 0,
        관악구: 0,
        광진구: 0,
        구로구: 0,
        금천구: 0,
        노원구: 0,
        도봉구: 0,
        동대문구: 0,
        동작구: 0,
        마포구: 0,
        서대문구: 0,
        서초구: 0,
        성동구: 0,
        성북구: 0,
        송파구: 0,
        양천구: 0,
        영등포구: 0,
        용산구: 0,
        은평구: 0,
        종로구: 0,
        중구: 0,
        중랑구: 0,
      };

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
        buildingsInRegion[POPUP_MOCK_DATA[i].gungu]++;
      }

      const gunguMarkers: any[] = [];
      const gunguOverlays: any[] = [];

      let gungu: GunguType;
      for (gungu in GUNGU) {
        if (buildingsInRegion[gungu] === 0) {
          continue;
        }

        const coord = new window.kakao.maps.LatLng(
          GUNGU[gungu][0],
          GUNGU[gungu][1],
        );

        const marker = new window.kakao.maps.Marker({
          map,
          position: coord,
        });
        gunguMarkers.push(marker);
        marker.setMap(map);

        const content =
          '<div class="bg-slate-200 p-4 border border-black">' +
          gungu +
          buildingsInRegion[gungu] +
          '</div>';

        const customOverlay = new window.kakao.maps.CustomOverlay({
          map: map,
          position: coord,
          content: content,
          yAnchor: 2,
        });
        gunguOverlays.push(customOverlay);
        customOverlay.setMap(map);
      }

      window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const zoomLevel = map.getLevel();

        if (zoomLevel <= 6) {
          gunguMarkers.forEach((marker) => {
            marker.setMap(null);
          });
          gunguOverlays.forEach((overlay) => {
            overlay.setMap(null);
          });
        } else {
          gunguMarkers.forEach((marker) => {
            marker.setMap(map);
          });
          gunguOverlays.forEach((overlay) => {
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

  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
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
        <form
          onSubmit={handleClick}
          className='w-250 fixed left-0 top-0 z-floating flex h-60 bg-transparent p-12'
        >
          <input
            onChange={handleAddressChange}
            placeholder='지역을 검색해보세요!'
            className='h-full rounded-md border border-gray-400 p-4 shadow-md'
          />
          <button className='ml-4 h-full w-60 rounded-md border border-gray-400 bg-orange-400 shadow-md'>
            검색
          </button>
        </form>
        <div id='map' className='h-full w-full' />
      </div>
    </>
  );
};

export default MapPage;
