import { useState } from 'react';
import { TabType } from 'types/client.types';
import SearchInput from 'components/commons/SearchInput';
import DescriptionTab from './DescriptionTab';
import RecommendTab from './RecommendTab';
import RegionTab from './RegionTab';
import SearchTab from './SearchTab';

interface TabProps {
  type: TabType;
  keyword: string | number | null;
}

const Tab = ({ type, keyword }: TabProps) => {
  const [tab, setTab] = useState(true);

  const openTab = () => {
    setTab(true);
  };

  const closeTab = () => {
    setTab(false);
  };

  return (
    <>
      {tab ? (
        <div className='fixed bottom-0 left-0 top-0 z-popup w-372 overflow-y-auto bg-white p-32'>
          <button onClick={closeTab} className='h-32 w-32 border border-black'>
            X
          </button>
          <SearchInput />
          <div className='h-32' />
          {type === 'recommend' && <RecommendTab />}
          {type === 'building' && <DescriptionTab id={Number(keyword)} />}
          {type === 'region' && <RegionTab region={String(keyword)} />}
          {type === 'search' && <SearchTab />}
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
