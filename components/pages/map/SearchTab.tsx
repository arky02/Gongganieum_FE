import { BuildingType } from 'types/client.types';
import BuildingCard from './BuildingCard';

const SearchTab = (props: { buildings: BuildingType[] | undefined }) => {
  const { buildings } = props;

  return (
    <>
      <div className='flex items-end justify-start gap-8'>
        <h3 className='pl-24 text-24 font-800 md:p-0 md:text-20'>검색결과</h3>
        {!!buildings?.length && (
          <span className='mb-4 text-14 font-400 text-gray-400 md:text-12'>
            {buildings?.length} 개의 검색결과가 있습니다.
          </span>
        )}
      </div>
      <div className='flex h-full w-full flex-col gap-32 overflow-y-auto overflow-x-hidden p-24 pt-0 md:gap-20 md:p-0'>
        {buildings?.map((building) => (
          <BuildingCard key={building._id} building={building} />
        ))}
        {buildings?.length === 0 && (
          <span className='m-auto text-14 font-400 text-gray-400'>
            검색 결과가 없습니다.
          </span>
        )}
      </div>
    </>
  );
};

export default SearchTab;
