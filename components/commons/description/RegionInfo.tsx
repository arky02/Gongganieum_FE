import DescriptionCard from './DescriptionCard';

const RegionInfo = () => {
  return (
    <div>
      <h3 className='mb-16 text-24 font-800'>XX시 지역 데이터</h3>
      <div className='flex flex-col gap-24'>
        <DescriptionCard title='실시간 인구 구성 비율'></DescriptionCard>
        <DescriptionCard title='연령대별 비율'></DescriptionCard>
        <DescriptionCard title='실시간 인구 및 혼잡도 추이 현황'></DescriptionCard>
        <DescriptionCard title='실시간 인구 구성 비율'></DescriptionCard>
      </div>
    </div>
  );
};

export default RegionInfo;
