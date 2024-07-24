import { CATEGORY, MARKER_ICON_SRC } from 'constants/common';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from 'store';
import { getIsDefaultMarkersVisible } from 'utils/getIsDefaultMarkersVisible';
import { BuildingType, CategoryType } from 'types/client.types';

const useMarkers = () => {
  const router = useRouter();
  const isDefaultVisible = getIsDefaultMarkersVisible(router.query);

  const { map } = useStore((state) => ({
    map: state.map,
  }));
  const [markers, setMarkers] = useState<any[]>([]);
  const [initialBuildings, setInitialBuildings] = useState<BuildingType[]>();

  const createMarkers = (buildings: BuildingType[] | undefined) => {
    if (router.query['isliked'] === 'true') {
      return;
    }
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
      const imageSize = new window.kakao.maps.Size(48, 48);
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
        const { as, q, cate, isliked } = router.query;
        router.push({
          query: { as, q, cate, isliked, building: building._id },
        });
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
    if (!isDefaultVisible) {
      deleteMarkers();
    }
  }, [router.query]);

  return { createMarkers, deleteMarkers };
};

export default useMarkers;
