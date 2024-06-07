import BuildingCard from './BuildingCard';

const RecommendTab = () => {
  return (
    <div className='w-full overflow-y-auto'>
      <h3 className='text-lg font-bold'>지금 핫한 팝업 건물!</h3>
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

export default RecommendTab;
