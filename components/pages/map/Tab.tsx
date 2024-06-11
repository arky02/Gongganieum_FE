import axios from 'axios';
import { SEARCH_AS } from 'constants/dropdown';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useFetch from 'hooks/map/useFetch';
import useSearch from 'hooks/map/useSearch';
import { AsType } from 'types/client.types';
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
  const { searchResult } = useFetch({ as, q });

  const renderTab = () => {
    if (router.query['building']) {
      return <BuildingTab id={Number(router.query['building'])} />;
    } else if (q && as) {
      return <SearchTab />;
    } else {
      return <RecommendTab />;
    }
  };

  return (
    <>
      {tab ? (
        <div className='fixed bottom-0 left-0 top-0 z-popup w-372 overflow-y-auto bg-white p-32'>
          <button onClick={closeTab} className='h-32 w-32 border border-black'>
            X
          </button>
          <SearchInput
            value={q}
            setValue={setQ}
            dropdownMenu={SEARCH_AS}
            selectedMenu={as}
            setSelectedMenu={setAs}
          />
          <div className='h-32' />
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
