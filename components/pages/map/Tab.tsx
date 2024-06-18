import { SEARCH_AS } from 'constants/dropdown';
import { useRouter } from 'next/router';
import { useState } from 'react';
import useFetch from 'hooks/map/useFetch';
import useSearch from 'hooks/map/useSearch';
import SearchInput from 'components/commons/SearchInput';
import BuildingTab from './BuildingTab';
import RecommendTab from './RecommendTab';
import SearchTab from './SearchTab';

const Tab = () => {
  const [tab, setTab] = useState(true);

  const openTab = () => {
    setTab(true);
  };

  const closeTab = () => {
    setTab(false);
  };

  const router = useRouter();
  const { as, setAs, q, setQ } = useSearch();
  const { searchResult, refetch } = useFetch({ as, q });

  const renderTab = () => {
    if (router.query['building']) {
      return <BuildingTab id={Number(router.query['building'])} />;
    } else if (q && as) {
      return <SearchTab buildings={searchResult} />;
    } else {
      return <RecommendTab />;
    }
  };

  return (
    <>
      {tab ? (
        <div className='fixed bottom-0 left-0 top-0 z-popup flex w-400 flex-col gap-24 overflow-y-auto bg-white'>
          {/* <button onClick={closeTab} className='h-32 w-32 border border-black'>
            X
          </button> */}
          <div className='p-24 pb-0'>
            <SearchInput
              value={q}
              setValue={setQ}
              onSubmit={refetch}
              dropdownMenu={SEARCH_AS}
              selectedMenu={as}
              setSelectedMenu={setAs}
            />
          </div>
          {renderTab()}
        </div>
      ) : (
        <button
          onClick={openTab}
          className='fixed left-0 top-1/2 z-popup h-32 w-32 border border-black bg-white'
        >
          {'>'}
        </button>
      )}
    </>
  );
};

export default Tab;
