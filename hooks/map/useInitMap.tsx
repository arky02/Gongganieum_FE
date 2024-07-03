import { CATEGORY } from 'constants/common';
import { GUNGU, GUNGU_COORD, GunguType } from 'constants/regions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from 'store';
import useKakaoMap from 'hooks/useKakaoMap';
import { BuildingType, CategoryType } from 'types/client.types';

const HOT_PLACE_COLOR = [
  { bg: 'bg-[rgb(141,151,165)]', border: 'border-t-[rgb(141,151,165)]' },
  { bg: 'bg-[rgb(110,121,135)]', border: 'border-t-[rgb(110,121,135)]' },
  { bg: 'bg-[rgb(75,85,98)]', border: 'border-t-[rgb(75,85,98)]' },
  { bg: 'bg-[rgb(52,62,75)]', border: 'border-t-[rgb(52,62,75)]' },
  { bg: 'bg-[rgb(25,31,40)]', border: 'border-t-[rgb(25,31,40)]' },
];

const MARKER_ICON_SRC = {
  패션: {
    default: '/icons/fashion-pin.svg',
    popup: '/icons/fashion-popup-pin.svg',
    isours: '/icons/fashion-isours-pin.svg',
  },
  뷰티: {
    default: '/icons/beauty-pin.svg',
    popup: '/icons/beauty-popup-pin.svg',
    isours: '/icons/beauty-isours-pin.svg',
  },
  'F&B': {
    default: '/icons/food-pin.svg',
    popup: '/icons/food-popup-pin.svg',
    isours: '/icons/food-isours-pin.svg',
  },
  캐릭터: {
    default: '/icons/character-pin.svg',
    popup: '/icons/character-popup-pin.svg',
    isours: '/icons/character-isours-pin.svg',
  },
  미디어: {
    default: '/icons/media-pin.svg',
    popup: '/icons/media-popup-pin.svg',
    isours: '/icons/media-isours-pin.svg',
  },
  기타: {
    default: '/icons/etc-pin.svg',
    popup: '/icons/etc-popup-pin.svg',
    isours: '/icons/etc-isours-pin.svg',
  },
};

const useInitMap = (buildings: BuildingType[] | undefined) => {
  const router = useRouter();
  const { map, setMap } = useStore((state) => ({
    map: state.map,
    setMap: state.setMap,
  }));

  const initMap = async () => {
    window.kakao?.maps?.load(() => {
      const mapContainer = document.getElementById('map');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.545, 126.91),
        level: 8,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  useKakaoMap({ callbackFn: initMap });

  const setMarkers = () => {
    if (!buildings || !map) {
      return;
    }

    const buildingMarkers: any[] = [];
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

      window.kakao.maps.event.addListener(marker, 'click', () => {
        router.push({ query: { building: building._id } });
      });

      buildingMarkers.push(marker);
      marker.setMap(map);
      marker.setVisible(false);
    });

    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const zoomLevel = map.getLevel();

      if (zoomLevel <= 6) {
        buildingMarkers.forEach((marker) => {
          marker.setVisible(true);
        });
      } else {
        buildingMarkers.forEach((marker) => {
          marker.setVisible(false);
        });
      }
    });

    const hotRate = getHotRate(buildings!);

    const gunguOverlays: any[] = [];
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
      content.className = 'flex flex-col items-center';
      const name = document.createElement('div');
      name.className = `w-108 h-44 rounded-full flex items-center justify-center text-white font-700 text-14 ${hotColor.bg}`;
      name.innerHTML = gungu;
      const bottomArrow = document.createElement('div');
      bottomArrow.className = `w-0 h-0 border-t-[12px] border-r-[12px] border-l-[12px] border-l-transparent border-r-transparent border-b-transparent ${hotColor.border}`;
      content.appendChild(name);
      content.appendChild(bottomArrow);

      const customOverlay = new window.kakao.maps.CustomOverlay({
        map,
        position: coord,
        content: content,
        yAnchor: 1,
      });

      gunguOverlays.push(customOverlay);
      customOverlay.setMap(map);

      content.addEventListener('click', () => {
        map.setLevel(6);
        map.setCenter(coord);
      });
    });

    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const zoomLevel = map.getLevel();

      if (zoomLevel <= 6) {
        gunguOverlays.forEach((overlay) => {
          overlay.setVisible(false);
        });
      } else {
        gunguOverlays.forEach((overlay) => {
          overlay.setVisible(true);
        });
      }
    });
  };

  useEffect(() => {
    setMarkers();
  }, [map, buildings]);
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
