import { CATEGORY, MARKER_ICON_SRC } from 'constants/common';
import { GUNGU, GUNGU_COORD, GunguType } from 'constants/regions';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from 'store';
import useKakaoMap from 'hooks/useKakaoMap';
import { getIsDefaultMarkersVisible } from 'utils/getIsDefaultMarkersVisible';
import { parseNumberWithComma } from 'utils/parseNumberWithComma';
import { getBuildingInfo } from 'apis/api';
import { BuildingType, CategoryType } from 'types/client.types';

const HOT_PLACE_COLOR = [
  {
    bg: 'bg-[rgba(141,151,165,0.8)]',
    border: 'border-t-[rgba(141,151,165,0.8)]',
  },
  {
    bg: 'bg-[rgba(110,121,135,0.83)]',
    border: 'border-t-[rgba(110,121,135,0.83)]',
  },
  { bg: 'bg-[rgba(75,85,98,0.87)]', border: 'border-t-[rgba(75,85,98,0.87)]' },
  { bg: 'bg-[rgba(51,53,55,0.9)]', border: 'border-t-[rgba(51,53,55,0.9)]' },
  { bg: 'bg-[rgb(33,35,37)]', border: 'border-t-[rgb(33,35,37)]' },
];

const useInitMap = (buildings: BuildingType[] | undefined) => {
  const { map, setMap } = useStore((state) => ({
    map: state.map,
    setMap: state.setMap,
  }));

  const router = useRouter();
  const isDefaultVisible = getIsDefaultMarkersVisible(router.query);

  const initMap = async () => {
    window.kakao?.maps?.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.545, 127),
        level: 8,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  useKakaoMap({ callbackFn: initMap });

  const [markers, setMarkers] = useState<{ building: any[]; gungu: any[] }>({
    building: [],
    gungu: [],
  });

  const initMarkers = async () => {
    if (!buildings || !map) {
      return;
    }

    buildings.forEach((building) => {
      const coord = building.coord.split(',');
      const position = new window.kakao.maps.LatLng(coord[0], coord[1]);

      const category = CATEGORY.includes(building.cate as CategoryType)
        ? building.cate
        : '기타';
      const isPopup = new Date(building.latest_end_date ?? '') > new Date();
      const isours = building.isours;

      const imageSrc = isours
        ? MARKER_ICON_SRC[category].isours
        : isPopup
          ? MARKER_ICON_SRC[category].popup
          : MARKER_ICON_SRC[category].default;
      const imageSize = new window.kakao.maps.Size(45, 45);
      const markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
      );
      const marker = new window.kakao.maps.Marker({
        map,
        position,
        image: markerImage,
        clickable: true,
      });

      setMarkers((prev) => ({ ...prev, building: [...prev.building, marker] }));

      marker.setMap(map);
      marker.setVisible(false);
      window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const zoomLevel = map.getLevel();
        const isSet = !!marker.getMap();
        if (isSet) {
          if (zoomLevel <= 6) {
            marker.setVisible(true);
          } else {
            marker.setVisible(false);
          }
        }
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        const { as, q, cate, isliked } = router.query;
        router.push({
          query: { as, q, cate, isliked, building: building._id },
        });
      });
    });

    const hotRate = getHotRate(buildings!);

    GUNGU.forEach((gungu) => {
      const popupCnt = hotRate[gungu];
      if (popupCnt === 0) {
        return;
      }

      const coord = new window.kakao.maps.LatLng(
        GUNGU_COORD[gungu][0],
        GUNGU_COORD[gungu][1],
      );

      const hotColor =
        popupCnt <= 20
          ? HOT_PLACE_COLOR[0]
          : popupCnt <= 40
            ? HOT_PLACE_COLOR[1]
            : popupCnt <= 60
              ? HOT_PLACE_COLOR[2]
              : popupCnt <= 100
                ? HOT_PLACE_COLOR[3]
                : HOT_PLACE_COLOR[4];

      const content = document.createElement('div');
      content.className = 'flex flex-col items-center justify-center';
      const box = document.createElement('div');
      box.className = `w-104 h-60 rounded-16 flex flex-col items-center justify-center text-white font-700 text-14 ${hotColor.bg}`;
      const name = document.createElement('span');
      name.className = `text-white font-700 text-16 h-[22px]`;
      name.innerHTML = gungu;
      const count = document.createElement('span');
      count.className = `text-white font-700 text-10 h-20`;
      count.innerHTML = `${parseNumberWithComma(popupCnt)} 개`;
      box.appendChild(name);
      box.appendChild(count);

      const bottomArrow = document.createElement('div');
      bottomArrow.className = `w-0 h-0 border-t-[12px] border-r-[12px] border-l-[12px] border-l-transparent border-r-transparent border-b-transparent ${hotColor.border}`;
      content.appendChild(box);
      content.appendChild(bottomArrow);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        map,
        position: coord,
        content: content,
        yAnchor: 1,
      });

      setMarkers((prev) => ({
        ...prev,
        gungu: [...prev.gungu, customOverlay],
      }));

      customOverlay.setMap(map);
      customOverlay.setVisible(isDefaultVisible);
      window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
        const zoomLevel = map.getLevel();
        const isSet = !!customOverlay.getMap();
        if (isSet) {
          if (zoomLevel <= 6) {
            customOverlay.setVisible(false);
          } else {
            customOverlay.setVisible(true);
          }
        }
      });
      content.addEventListener('click', () => {
        map.setLevel(6);
        map.setCenter(coord);
      });
    });

    const buildingId = Number(router.query['building']);
    if (buildingId) {
      const buildingInfo = await getBuildingInfo(buildingId);
      const coord = buildingInfo.coord.split(',');
      const position = new window.kakao.maps.LatLng(coord[0], coord[1]);
      const bound = new window.kakao.maps.LatLngBounds();
      bound.extend(position);
      map.panTo(bound);
    }
  };

  useEffect(() => {
    initMarkers();
  }, [map, buildings]);

  const showMapMarkers = () => {
    markers.gungu.forEach((marker) => {
      marker.setMap(map);
      const zoomLevel = map.getLevel();
      if (zoomLevel <= 6) {
        marker.setVisible(false);
      } else {
        marker.setVisible(true);
      }
    });
    markers.building.forEach((marker) => {
      marker.setMap(map);
      const zoomLevel = map.getLevel();
      if (zoomLevel <= 6) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });
  };

  const hideMapMarkers = () => {
    markers.gungu.forEach((marker) => marker.setMap(null));
    markers.building.forEach((marker) => marker.setMap(null));
  };

  useEffect(() => {
    if (isDefaultVisible) {
      showMapMarkers();
    } else {
      hideMapMarkers();
    }
  }, [router.query, showMapMarkers, hideMapMarkers]);
};

export default useInitMap;

const getHotRate = (buildings: BuildingType[]) => {
  const popupsInRegion = {
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

  buildings.forEach((building) => {
    const gungu = building.address.split(' ')[1] as GunguType;
    if (!building.popups) {
      return;
    }
    popupsInRegion[gungu] += building.popups.length;
  });

  return popupsInRegion;
};
