import { useQuery } from '@tanstack/react-query';
import useInitMap from 'hooks/map/useInitMap';
import { getBuildings } from 'apis/api';
import Tab from 'components/pages/map/Tab';

const MapPage = () => {
  const { data: buildings } = useQuery({
    queryKey: ['buildings'],
    queryFn: getBuildings,
  });

  useInitMap(buildings);

  // const [address, setAddress] = useState('');

  // const handleAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setAddress(e.target.value);
  // };

  // const handleClick = (e: SyntheticEvent) => {
  //   e.preventDefault();

  //   if (!map) {
  //     return;
  //   }

  //   const placeService = new window.kakao.maps.services.Places();

  //   placeService.keywordSearch(address, (popups: any, status: any) => {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       const bounds = new window.kakao.maps.LatLngBounds();

  //       for (let i = 0; i < popups.length; i++) {
  //         bounds.extend(new window.kakao.maps.LatLng(popups[i].y, popups[i].x));
  //       }

  //       map.setBounds(bounds);
  //     }
  //   });
  // };

  return (
    <div className='relative flex h-screen w-screen justify-end'>
      <Tab />
      <div id='map' className='h-full w-full' />
    </div>
  );
};

export default MapPage;
