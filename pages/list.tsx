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
import ListCheckBoxs from 'components/pages/list/ListCheckBoxs';

const List = () => {
  const { data: buildingListData, refetch } = useQuery({
    queryKey: ['buildingListData'],
    queryFn: () => getBuildings(),
    enabled: false,
  });

  const router = useRouter();
  const { cate } = router.query;
  const { as, setAs, q, setQ } = useSearch();
  const { searchResult, refetch: searchRefetch } = useFetch({ as, q });

  const handleClickOurs = () => {
    const { isours, ...otherQueries } = router.query;

    if (isours === '1') {
      router.push({
        pathname: router.pathname,
        query: otherQueries,
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: {
          ...otherQueries,
          isours: '1',
        },
      });
    }

    refetch();
  };

  // TODO: 진행중인 팝업 클릭 시 함수 추가

  return (
    <div className='my-76 flex flex-col justify-center gap-24 px-344'>
      <span className='text-32 font-800'>{cate || '전체'}</span>
      <ListCategoryTabs cate={cate} />
      <div className='flex justify-between'>
        <div className='w-394 flex'>
          <SearchInput
            value={q}
            setValue={setQ}
            onSubmit={searchRefetch}
            dropdownMenu={SEARCH_AS}
            selectedMenu={as}
            setSelectedMenu={setAs}
          />
        </div>
        <div className='flex items-center gap-8'>
          <ListCheckBoxs
            onClickOurs={handleClickOurs}
            onClickPopup={handleClickOurs}
          />
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
