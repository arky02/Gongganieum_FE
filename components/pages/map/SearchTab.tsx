import { BuildingType } from 'types/client.types';
import BuildingCard from './BuildingCard';

interface Props {
  buildings: BuildingType[] | undefined;
}

const SearchTab = ({ buildings }: Props) => {
  return (
    <div className='w-full overflow-y-auto'>
      <div className='flex flex-col gap-8'>
        {buildings?.map((building) => (
          <BuildingCard building={building} key={building._id} />
        ))}
      </div>
    </div>
  );
};

export default SearchTab;
