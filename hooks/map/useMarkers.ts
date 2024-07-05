import { CATEGORY, MARKER_ICON_SRC } from 'constants/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from 'store';
import { BuildingType, CategoryType } from 'types/client.types';

const useMarkers = () => {
  const router = useRouter();
  const showDefaultMarkers =
    !router.query['q'] &&
    (router.query['cate'] === '전체' || !router.query['cate']);

  const { map, showMarkers, hideMarkers } = useStore((state) => ({
    map: state.map,
    showMarkers: state.showMarkers,
    hideMarkers: state.hideMarkers,
  }));
  const [markers, setMarkers] = useState<any[]>([]);
  const [initialBuildings, setInitialBuildings] = useState<BuildingType[]>();

  const createMarkers = (buildings: BuildingType[] | undefined) => {
    if (!initialBuildings) {
      setInitialBuildings(buildings);
    }
    if (!map || !buildings) {
      return;
    }

    const bound = new window.kakao.maps.LatLngBounds();

    buildings.forEach((building) => {
      const coord = building.coord.split(',');
      const position = new window.kakao.maps.LatLng(coord[0], coord[1]);
      bound.extend(position);

      const category = CATEGORY.includes(building.cate as CategoryType)
        ? building.cate
        : '기타';
      const isours = building.isours;

      const imageSrc = isours
        ? MARKER_ICON_SRC[category].isours
        : MARKER_ICON_SRC[category].search;
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
        zIndex: 99,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        router.push({ query: { building: building._id } });
      });
      setMarkers((prev) => [...prev, marker]);
      marker.setMap(map);
    });

    if (buildings.length) {
      map.panTo(bound);
    }
  };

  const deleteMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  useEffect(() => {
    createMarkers(initialBuildings);
  }, [map, initialBuildings]);

  useEffect(() => {
    if (router.query['building']) {
      return;
    }
    if (!showDefaultMarkers) {
      hideMarkers?.();
    } else {
      showMarkers?.();
      deleteMarkers();
    }
  }, [router.query, showMarkers, hideMarkers]);

  return { createMarkers, deleteMarkers };
};

export default useMarkers;
