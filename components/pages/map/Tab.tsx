import { TabType } from 'types/client.types';
import SearchInput from 'components/commons/SearchInput';
import BuildingCard from './BuildingCard';
import DescriptionTab from './DescriptionTab';
import RecommendTab from './RecommendTab';
import RegionTab from './RegionTab';
import SearchTab from './SearchTab';

interface TabProps {
  type: TabType;
  keyword: string | number | null;
}

const Tab = ({ type, keyword }: TabProps) => {
  return (
    <div className='fixed bottom-0 left-0 top-0 z-popup w-372 overflow-y-auto bg-white p-32'>
      <SearchInput />
      <div className='h-32' />
      {type === 'recommend' && <RecommendTab />}
      {type === 'building' && <DescriptionTab id={Number(keyword)} />}
      {type === 'region' && <RegionTab region={String(keyword)} />}
      {type === 'search' && <SearchTab />}
    </div>
  );
};

export default Tab;
