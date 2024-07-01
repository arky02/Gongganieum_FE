import { useEffect, useState } from 'react';
import useKakaoMap from 'hooks/useKakaoMap';

const MapCard = (props: { coord: string[] }) => {
  const { coord } = props;
  const [map, setMap] = useState<any>();

  const initMap = async () => {
    window.kakao?.maps?.load(() => {
      const mapContainer = document.getElementById('map-building');
      const mapOption = {
        center: new window.kakao.maps.LatLng(37.545, 126.91),
        level: 4,
      };
      const map = new window.kakao.maps.Map(mapContainer, mapOption);
      setMap(map);
    });
  };

  useKakaoMap({ callbackFn: initMap });

  useEffect(() => {
    if (!map || !coord.length) {
      return;
    }

    const position = new window.kakao.maps.LatLng(coord[0], coord[1]);
    map.setCenter(position);
    const imageSrc = '/icons/building-pin.svg';
    const imageSize = new window.kakao.maps.Size(32, 32);
    const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

    const marker = new window.kakao.maps.Marker({
      map,
      position,
      image: markerImage,
    });

    marker.setMap(map);
  }, [map, coord]);

  return <div id='map-building' className='h-300 w-full rounded-12' />;
};

export default MapCard;
