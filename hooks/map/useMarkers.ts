import { useRouter } from 'next/router';
import { useState } from 'react';
import { useStore } from 'store';
import { BuildingType } from 'types/client.types';

const useMarkers = () => {
  const router = useRouter();
  const { map } = useStore((state) => ({
    map: state.map,
  }));
  const [markers, setMarkers] = useState<any[]>([]);

  const createMarkers = (buildings: BuildingType[] | undefined) => {
    if (!buildings) {
      return;
    }

    buildings.forEach((building) => {
      const coord = building.coord.split(', ');
      const position = new window.kakao.maps.LatLng(coord[0], coord[1]);

      const imageSrc = '/icons/dot.png';
      const imageSize = new window.kakao.maps.Size(64, 69);
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
      setMarkers((prev) => [...prev, marker]);
      marker.setMap(null);
    });

    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      const zoomLevel = map.getLevel();

      if (zoomLevel <= 6) {
        markers.forEach((marker) => {
          marker.setMap(map);
        });
      } else {
        markers.forEach((marker) => {
          marker.setMap(null);
        });
      }
    });
  };

  const deleteMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  return { createMarkers, deleteMarkers };
};

export default useMarkers;
