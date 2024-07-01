import { SEARCH_AS } from 'constants/dropdown';
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

  const { searchResult, refetch } = useFetch({
    q,
    as,
    order,
    cate,
    isours: isours === '1' ? true : undefined,
  });

  const handleClickCategoryTab = (category: string) => {
    setCate(category as CategoryType);
  };

  const handleSelectSortButton = (e: ChangeEvent<HTMLSelectElement>) => {
    const order = e.target.value as OrderType;
    setOrder(order);
  };

  const handleClickOurs = () => {
    isours === '1' ? setIsours('0') : setIsours('1');
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
        {/* TODO: 진행중인 팝업 로직 생기면 수정 예정 */}
        {(filteredBuildings || searchResult)?.map((building) => (
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
