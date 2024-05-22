import { useEffect } from 'react';

const MapPage = () => {
  const initMap = () => {
    const map = new window.naver.maps.Map('map', {
      // center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 11,
      zoomControl: true,
      zoomControlOptions: {
        position: naver.maps.Position.TOP_RIGHT,
      },
      logoControl: false,
      tileSpare: 10,
      tileTransition: false,
    });
  };

  useEffect(() => {
    initMap();
  }, []);

  return <div id='map' className='h-screen w-screen'></div>;
};

export default MapPage;
