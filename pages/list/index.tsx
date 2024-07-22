import { useQuery } from '@tanstack/react-query';
import { EMPTY_LIST_URL, SEARCH_AS } from 'constants/common';
import { ChangeEvent, useState } from 'react';
import useFetch from 'hooks/useFetch';
import useSearch from 'hooks/useSearch';
import { getLikeBuildingIds } from 'apis/api';
import { BuildingType, CategoryType, OrderType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';
import SearchInput from 'components/commons/SearchInput';
import ListCategoryTabs from 'components/pages/list/ListCategoryTabs';
import ListCheckBoxs from 'components/pages/list/ListCheckBoxs';
import ListSortingButton from 'components/pages/list/ListSortingButton';

type ExtendedCategoryType = CategoryType & '전체';

const List = () => {
  const [filteredBuildings, setFilteredBuildings] = useState<
    BuildingType[] | null | undefined
  >(null);

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

  // TODO: 데이터 꼬임 현상 (7/16): 로그아웃이 되면 likeBuildingIds가 null이 될 수 있게
  const { data: likeBuildingIds } = useQuery({
    queryKey: ['likeBuildingIds'],
    queryFn: () => getLikeBuildingIds(),
  });

  // const { userAccessToken } = useManageUserAccessToken();
  // const queryClient = useQueryClient();
  // queryClient.invalidateQueries({ queryKey: ['likeBuildingIds'] });

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
      <div className='my-76 flex h-full w-full max-w-1232 flex-col justify-center gap-24 md:my-8 md:gap-12 md:px-16'>
        <span className='text-32 font-800 md:text-24'>{cate || '전체'}</span>
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
        {searchResult?.length === 0 ? (
          <div className='flex h-[60dvh] w-full flex-col items-center justify-center gap-20'>
            <img src={EMPTY_LIST_URL} alt='비어있는 리스트 이미지' />
            <div className='flex flex-col items-center justify-center text-18'>
              <span>조건과 일치하는 건물이 없습니다.</span>
            </div>
          </div>
        ) : (
          <div className='mx-auto my-20 grid grid-cols-3 gap-x-24 gap-y-48 md:my-0 md:grid-cols-2 md:gap-y-24'>
            {/* TODO: 진행중인 팝업 로직 생기면 수정 예정 */}
            {searchResult?.map((building) => (
              <BuildingCard
                mode='like'
                key={building._id}
                _id={building._id}
                building={building}
                isLiked={likeBuildingIds?.includes(building._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
