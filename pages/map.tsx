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

  return (
    <div className='relative flex h-screen w-screen justify-end'>
      <Tab />
      <div id='map' className='h-full w-full' />
    </div>
  );
};

export default MapPage;
