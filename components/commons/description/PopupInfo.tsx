import DescriptionCard from './DescriptionCard';

const PopupInfo = () => {
  return (
    <div>
      <h3 className='mb-16 text-24 font-800'>팝업 정보</h3>
      <div className='flex flex-col gap-24'>
        <DescriptionCard title='팝업 데이터'></DescriptionCard>
        <DescriptionCard title='팝업 히스토리 순위'></DescriptionCard>
      </div>
    </div>
  );
};

export default PopupInfo;
