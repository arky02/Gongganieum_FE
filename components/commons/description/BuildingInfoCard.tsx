import DescriptionCard from './DescriptionCard';

const BuildingInfoCard = (props: { address: string }) => {
  const { address } = props;

  return (
    <DescriptionCard>
      <div className='flex flex-col gap-16'>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>운영 시간</span>
          <span className='text-18 font-800'>
            2024년 6월 19일 ~ 2024년 8월 19일
          </span>
        </div>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>연면적</span>
          <span className='text-18 font-800'>185m</span>
        </div>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>용적률</span>
          <span className='text-18 font-800'>Item</span>
        </div>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>건폐율</span>
          <span className='text-18 font-800'>Item</span>
        </div>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>사용승인</span>
          <span className='text-18 font-800'>Item</span>
        </div>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>주차장</span>
          <span className='text-18 font-800'>Item</span>
        </div>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>승강기</span>
          <span className='text-18 font-800'>Item</span>
        </div>
        <div className='flex flex-col gap-8'>
          <span className='text-18 font-600'>규모</span>
          <span className='text-18 font-800'>Item</span>
        </div>
      </div>
    </DescriptionCard>
  );
};

export default BuildingInfoCard;
