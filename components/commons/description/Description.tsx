import { useQuery } from '@tanstack/react-query';
import { getPopulationData } from 'apis/getPopulationData';
import { PopupType } from 'types/client.types';
import BuildingInfoCard from './BuildingInfoCard';
import DescriptionCard from './DescriptionCard';
import PopupHistoryCard from './PopupHistoryCard';
import PopupRankingCard from './PopupRankingCard';

const Description = (props: {
  popups: PopupType[];
  address: string;
  region: string;
}) => {
  const { popups, address, region } = props;

  const { data } = useQuery({
    queryKey: ['region', region],
    queryFn: () => getPopulationData('성수카페거리'),
  });

  console.log(data);

  return (
    <div className='flex flex-col gap-36'>
      <div>
        <h3 className='mb-16 text-24 font-800'>팝업 정보</h3>
        <div className='flex flex-col gap-24'>
          <PopupRankingCard popups={popups} />
          <PopupHistoryCard popups={popups} />
        </div>
      </div>
      <div>
        <h3 className='mb-16 text-24 font-800'>건물 정보</h3>
        <BuildingInfoCard address={address} />
      </div>
      <div>
        <h3 className='mb-16 text-24 font-800'>XX시 지역 데이터</h3>
        <div className='flex flex-col gap-24'>
          <DescriptionCard title='실시간 성비'></DescriptionCard>
          <DescriptionCard title='연령대별 비율'></DescriptionCard>
          <DescriptionCard title='실시간 인구 및 혼잡도 추이 현황'></DescriptionCard>
          <DescriptionCard title='실시간 인구 구성 비율'></DescriptionCard>
        </div>
      </div>
      <div>
        <h3 className='mb-16 text-24 font-800'>찾아오시는 길</h3>
        <DescriptionCard></DescriptionCard>
      </div>
    </div>
  );
};

export default Description;
