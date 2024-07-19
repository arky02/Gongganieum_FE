import { EMPTY_LIST_URL } from 'constants/common';
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
      <div className='flex h-full w-full flex-col gap-32 overflow-y-auto overflow-x-hidden p-24 pt-0 md:gap-20 md:p-0 md:pb-100'>
        {buildings?.map((building) => (
          <BuildingCard key={building._id} building={building} />
        ))}
        {buildings?.length === 0 && (
          <div className='flex h-[60dvh] w-full flex-col items-center justify-center gap-16'>
            <img src={EMPTY_LIST_URL} alt='비어있는 리스트 이미지' />
            <div className='flex flex-col items-center justify-center text-18'>
              <span>검색어와 일치하는 건물이 없습니다.</span>
              <span>다른 검색어를 입력해 보세요.</span>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchTab;
