import { SEARCH_AS } from 'constants/common';
import { useRouter } from 'next/router';
import useFetch from 'hooks/useFetch';
import useSearch from 'hooks/useSearch';
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
          <div className='p-24 pb-0'>
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
          <div className='p-24 pb-0'>
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

  return (
    <div className='flex w-400 shrink-0 flex-col gap-24 bg-white'>
      {renderTab()}
    </div>
  );
};

export default Tab;
