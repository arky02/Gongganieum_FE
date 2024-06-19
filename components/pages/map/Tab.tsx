import { SEARCH_AS } from 'constants/dropdown';
import { useRouter } from 'next/router';
import useFetch from 'hooks/map/useFetch';
import useSearch from 'hooks/map/useSearch';
import SearchInput from 'components/commons/SearchInput';
import BuildingTab from './BuildingTab';
import RecommendTab from './RecommendTab';
import SearchTab from './SearchTab';

const Tab = () => {
  const router = useRouter();
  const { as, setAs, q, setQ } = useSearch();
  const { searchResult, refetch } = useFetch({ as, q });

  const renderTab = () => {
    if (router.query['building']) {
      return <BuildingTab id={Number(router.query['building'])} />;
    } else if (q && as) {
      return (
        <>
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
              onSubmit={refetch}
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
    <div className='fixed bottom-0 left-0 top-72 z-popup flex w-400 flex-col gap-24 bg-white'>
      {renderTab()}
    </div>
  );
};

export default Tab;
