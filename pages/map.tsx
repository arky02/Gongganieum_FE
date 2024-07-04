import { useQuery } from '@tanstack/react-query';
import { CATEGORY } from 'constants/common';
import useInitMap from 'hooks/map/useInitMap';
import { getBuildings } from 'apis/api';
import FilterButton from 'components/pages/map/FilterButton';
import Tab from 'components/pages/map/Tab';

const Map = () => {
  const { data: buildings } = useQuery({
    queryKey: ['buildings'],
    queryFn: getBuildings,
  });

  useInitMap(buildings);

  return (
    <div className='relative flex h-[calc(100dvh-72px)] w-screen justify-end overflow-hidden'>
      <Tab />
      <div className='fixed left-432 top-92 z-popup flex h-40 gap-12'>
        {CATEGORY.map((category) => (
          <FilterButton key={category} category={category} />
        ))}
      </div>
      <div id='map' className='h-full w-full' />
    </div>
  );
};

export default Map;
