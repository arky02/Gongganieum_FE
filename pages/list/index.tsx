import { SEARCH_AS } from 'constants/common';
import { useRouter } from 'next/router';
import { ChangeEvent, useState } from 'react';
import useFetch from 'hooks/map/useFetch';
import useSearch from 'hooks/map/useSearch';
import { BuildingType, CategoryType, OrderType } from 'types/client.types';
import SearchInput from 'components/commons/SearchInput';
import ListBuildingCard from 'components/pages/list/ListBuildingCard';
import ListCategoryTabs from 'components/pages/list/ListCategoryTabs';
import ListCheckBoxs from 'components/pages/list/ListCheckBoxs';
import ListSortingButton from 'components/pages/list/ListSortingButton';

type ExtendedCategoryType = CategoryType & '전체';

const List = () => {
  const [filteredBuildings, setFilteredBuildings] = useState<
    BuildingType[] | null | undefined
  >(null);

  const router = useRouter();
  const {
    q,
    setQ,
    as,
    setAs,
    order,
    setOrder,
    cate,
    setCate,
    isours,
    setIsours,
  } = useSearch();

  const { searchResult } = useFetch({
    q,
    as,
    order,
    cate,
    isours,
  });

  const handleClickCategoryTab = (category: string) => {
    setCate(category as ExtendedCategoryType);
  };

  const handleSelectSortButton = (e: ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as OrderType;
    setOrder(order);
  };

  const handleClickOurs = () => {
    setIsours(!isours);
  };

  // TODO: 백엔드에서 처리 예정 (나중에 반영하기, 사유: 페이지네이션)
  const handleClickIsPopup = () => {
    const today = new Date();
    const filtered = searchResult?.filter(
      (building) => today < new Date(building.latest_end_date),
    );
    setFilteredBuildings(filtered);
  };

  return (
    <div className='flex justify-center'>
      <div className='my-76 flex flex-col justify-center gap-24 md:px-16'>
        <span className='text-32 font-800'>{cate || '전체'}</span>
        <ListCategoryTabs
          cate={cate}
          onClickCategoryTab={handleClickCategoryTab}
        />
        <div className='flex justify-between md:flex-col md:gap-16'>
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
        <div className='mx-auto my-20 grid grid-cols-3 gap-x-24 gap-y-36 gap-y-48 md:grid-cols-2'>
          {/* TODO: 진행중인 팝업 로직 생기면 수정 예정 */}
          {(filteredBuildings || searchResult)
            ?.slice(0, 30)
            ?.map((building) => (
              <ListBuildingCard
                key={building._id}
                id={building._id}
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
    </div>
  );
};

export default List;
