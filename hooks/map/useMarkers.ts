import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useStore } from 'store';
import { BuildingType } from 'types/client.types';

const useMarkers = () => {
  const router = useRouter();
  const { map } = useStore((state) => ({
    map: state.map,
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

    buildings.forEach((building) => {
      const coord = building.coord.split(', ');
      const position = new window.kakao.maps.LatLng(coord[0], coord[1]);

      const imageSrc = '/icons/dot.png';
      const imageSize = new window.kakao.maps.Size(20, 20);
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
  };

  const deleteMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  useEffect(() => {
    console.log(initialBuildings, map);
    createMarkers(initialBuildings);
  }, [map, initialBuildings]);

  return { createMarkers, deleteMarkers };
};

export default useMarkers;
