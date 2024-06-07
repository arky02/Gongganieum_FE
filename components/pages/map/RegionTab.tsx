import BuildingCard from './BuildingCard';

interface Props {
  region: string;
}

const RegionTab = ({ region }: Props) => {
  return (
    <div className='w-full overflow-y-auto'>
      <h3 className='text-lg font-bold'>{region}</h3>
      <div className='flex flex-col gap-8'>
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
        <BuildingCard />
      </div>
    </div>
  );
};

export default RegionTab;
