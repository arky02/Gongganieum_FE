import { useQuery } from '@tanstack/react-query';
import { getSearchResult } from 'apis/api';
import BuildingCard from './BuildingCard';

const RecommendTab = () => {
  const { data: buildings } = useQuery({
    queryKey: ['recommend'],
    queryFn: () => getSearchResult('지역명', '성수'),
  });

  return (
    <>
      <h3 className='px-24 text-24 font-800'>이런 건물 어때요?</h3>
      <div className='flex h-full w-full flex-col gap-32 overflow-y-auto overflow-x-hidden p-24 pt-0'>
        {buildings?.map((building) => (
          <BuildingCard key={building._id} building={building} />
        ))}
      </div>
    </>
  );
};

export default RecommendTab;
