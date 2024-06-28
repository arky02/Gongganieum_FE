import { useQuery } from '@tanstack/react-query';
import { SEARCH_AS } from 'constants/dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useSearch from 'hooks/map/useSearch';
import { getFilteredBuildings } from 'apis/api';
import {
  AsType,
  BuildingType,
  CategoryType,
  OrderType,
} from 'types/client.types';
import SearchInput from 'components/commons/SearchInput';
import ListBuildingCard from 'components/pages/list/ListBuildingCard';
import ListCategoryTabs from 'components/pages/list/ListCategoryTabs';
import ListCheckBoxs from 'components/pages/list/ListCheckBoxs';
import ListSortingButton from 'components/pages/list/ListSortingButton';

const List = () => {
  const [filteredBuildings, setFilteredBuildings] = useState<
    BuildingType[] | null | undefined
  >(null);

  const router = useRouter();
  const { cate, q: urlQ, order, isours: urlIsOurs, as: urlAs } = router.query;
  const { as, setAs, q, setQ } = useSearch();

  const queryParams = {
    q: urlQ as string | undefined,
    order: order as OrderType | undefined,
    cate: cate as CategoryType | undefined,
    isours: urlIsOurs === '1' ? true : undefined,
    as: urlAs as AsType | undefined,
  };

  const { data: buildingListData, refetch } = useQuery({
    queryKey: ['buildingListData'],
    queryFn: () => getFilteredBuildings(queryParams),
    enabled: false,
  });

  const handleClickCategoryTab = (category: string) => {
    if (category === '음식') {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          cate: 'F&B',
        },
      });
    } else {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          cate: category,
        },
      });
    }
  };

  const handleSelectSortButton = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value;
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        order: order,
      },
    });
  };

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
  };

  const handleClickIsPopup = () => {
    const today = new Date();
    const filtered = buildingListData?.filter(
      (building) => today < new Date(building.latest_end_date),
    );
    setFilteredBuildings(filtered);
  };

  useEffect(() => {
    refetch();
  }, [router.query]);

  return (
    <div className='my-76 flex flex-col justify-center gap-24 px-344'>
      <span className='text-32 font-800'>{cate || '전체'}</span>
      <ListCategoryTabs
        cate={cate}
        onClickCategoryTab={handleClickCategoryTab}
      />
      <div className='flex justify-between'>
        <div className='w-394 flex'>
          <SearchInput
            value={q}
            setValue={setQ}
            dropdownMenu={SEARCH_AS}
            selectedMenu={as}
            setSelectedMenu={setAs}
          />
        </div>
        <div className='flex items-center gap-8'>
          <ListCheckBoxs
            onClickOurs={handleClickOurs}
            onClickIsPopup={handleClickIsPopup}
          />
          <ListSortingButton onSelected={handleSelectSortButton} />
        </div>
      </div>
      {/* card-list */}
      <div className='mx-auto my-20 grid grid-cols-3 gap-x-24 gap-y-48'>
        {(filteredBuildings || buildingListData)?.map((building) => (
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
