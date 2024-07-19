import { useQuery } from '@tanstack/react-query';
import { EMPTY_LIST_URL } from 'constants/common';
import { getRecommendedBuildings } from 'apis/api';
import BuildingCard from './BuildingCard';

const RecommendTab = () => {
  const { data: buildings } = useQuery({
    queryKey: ['recommend'],
    queryFn: () => getRecommendedBuildings(),
  });

  return (
    <>
      <h3 className='px-24 text-24 font-800 md:px-0 md:text-20'>
        이런 건물 어때요?
      </h3>
      <div className='flex h-full w-full flex-col gap-32 overflow-y-auto overflow-x-hidden p-24 pt-0 md:gap-20 md:p-0 md:pb-100'>
        {buildings?.map((building) => (
          <BuildingCard
            key={building._id}
            building={{ ...building.content, _id: building.contentId }}
          />
        ))}
        {buildings?.length === 0 && (
          <div className='flex h-[60dvh] w-full flex-col items-center justify-center gap-16'>
            <img src={EMPTY_LIST_URL} alt='비어있는 리스트 이미지' />
            <div className='flex flex-col items-center justify-center text-18'>
              <span>추천하는 건물이 없습니다.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default RecommendTab;
