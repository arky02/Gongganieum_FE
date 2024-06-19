import DescriptionCard from './DescriptionCard';

const BuildingInfo = () => {
  return (
    <div>
      <h3 className='mb-16 text-24 font-800'>건물 정보</h3>
      <div className='flex flex-col gap-24'>
        <DescriptionCard></DescriptionCard>
      </div>
    </div>
  );
};

export default BuildingInfo;
