import { useQuery } from '@tanstack/react-query';
import { getFilteredBuildings } from 'apis/api';
import BuildingCard from './BuildingCard';

const RecommendTab = () => {
  const { data: buildings } = useQuery({
    queryKey: ['recommend'],
    queryFn: () => getFilteredBuildings({ as: '지역명', q: '성수' }),
  });

  return (
    <>
      <h3 className='px-24 text-24 font-800 md:px-0 md:text-20'>
        이런 건물 어때요?
      </h3>
      <div className='flex h-full w-full flex-col gap-32 overflow-y-auto overflow-x-hidden p-24 pt-0 md:gap-20 md:p-0'>
        {buildings?.map((building) => (
          <BuildingCard key={building._id} building={building} />
        ))}
      </div>
    </>
  );
};

export default RecommendTab;
