import { SEARCH_AS } from 'constants/common';
import { useRouter } from 'next/router';
import useBottomSheet from 'hooks/useBottomSheet';
import useFetch from 'hooks/useFetch';
import useSearch from 'hooks/useSearch';
import BottomSheet from 'components/commons/BottomSheet';
import SearchInput from 'components/commons/SearchInput';
import BuildingTab from './BuildingTab';
import RecommendTab from './RecommendTab';
import SearchTab from './SearchTab';

const Tab = () => {
  const router = useRouter();
  const { as, setAs, q, setQ, cate, isours } = useSearch();
  const { searchResult } = useFetch({
    as,
    q,
    cate,
    isours,
    mapFlag: true,
  });

  const isSearched = q || cate !== '전체';

  const renderTab = () => {
    if (router.query['building']) {
      return <BuildingTab id={Number(router.query['building'])} />;
    } else if (isSearched) {
      return (
        <>
          <div className='p-24 pb-0 md:p-0'>
            <SearchInput
              value={q}
              setValue={setQ}
              dropdownMenu={SEARCH_AS}
              selectedMenu={as}
              setSelectedMenu={setAs}
            />
          </div>
          <SearchTab buildings={searchResult} />
        </>
      );
    } else {
      return (
        <>
          <div className='p-24 pb-0 md:p-0'>
            <SearchInput
              value={q}
              setValue={setQ}
              dropdownMenu={SEARCH_AS}
              selectedMenu={as}
              setSelectedMenu={setAs}
            />
          </div>
          <RecommendTab />
        </>
      );
    }
  };

  const { bottomSheetRef, contentRef } = useBottomSheet();

  return (
    <>
      <div className='flex w-400 shrink-0 flex-col gap-24 bg-white md:hidden'>
        {renderTab()}
      </div>
      <BottomSheet ref={bottomSheetRef}>
        <div ref={contentRef} className='flex flex-col gap-16 overflow-scroll'>
          {renderTab()}
        </div>
      </BottomSheet>
    </>
  );
};

export default Tab;
