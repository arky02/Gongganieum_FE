import { useQuery } from '@tanstack/react-query';
import { SEARCH_AS } from 'constants/dropdown';
import { useRouter } from 'next/router';
import React from 'react';
import useFetch from 'hooks/map/useFetch';
import useSearch from 'hooks/map/useSearch';
import { getBuildings } from 'apis/api';
import SearchInput from 'components/commons/SearchInput';
import ListBuildingCard from 'components/pages/list/ListBuildingCard';
import ListCategoryTabs from 'components/pages/list/ListCategoryTabs';

const List = () => {
  const { data: buildingListData } = useQuery({
    queryKey: ['buildingListData'],
    queryFn: () => getBuildings(),
  });

  const router = useRouter();
  const { cate } = router.query;
  const { as, setAs, q, setQ } = useSearch();
  const { searchResult, refetch } = useFetch({ as, q });

  // console.log(buildingListData);

  return (
    <div className='my-76 flex flex-col justify-center gap-24 px-344'>
      <span className='text-32 font-800'>{cate || '전체'}</span>
      <ListCategoryTabs cate={cate} />
      <div className='flex justify-between'>
        <div className='w-394 flex'>
          <SearchInput
            value={q}
            setValue={setQ}
            onSubmit={refetch}
            dropdownMenu={SEARCH_AS}
            selectedMenu={as}
            setSelectedMenu={setAs}
          />
        </div>
        <div className='flex'>
          <div>체크박스</div>
          <div>정렬</div>
        </div>
      </div>
      {/* card-list */}
      <div className='mx-auto my-20 grid grid-cols-3 gap-x-24 gap-y-48'>
        {buildingListData?.map((building) => (
          <ListBuildingCard
            key={building._id}
            name={building.name}
            address={building.address}
            isours={building.isours}
            cate={building.cate}
            tag={building.tag}
            latest_end_date={building.latest_end_date}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
