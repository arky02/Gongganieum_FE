import { useQuery } from '@tanstack/react-query';
import { getPopulationData } from 'apis/getPopulationData';
import { PopupType } from 'types/client.types';
import AgeRatioCard from './AgeRatioCard';
import BuildingInfoCard from './BuildingInfoCard';
import DescriptionCard from './DescriptionCard';
import GenderRatioCard from './GenderRatioCard';
import PopupHistoryCard from './PopupHistoryCard';
import PopupRankingCard from './PopupRankingCard';
import ResidentRatioCard from './ResidentRatioCard';

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
          <GenderRatioCard
            male={Number(data?.maleRate) ?? 50}
            female={Number(data?.femaleRate) ?? 50}
          />
          <AgeRatioCard
            ageTeenager={Number(data?.ageTeenager) ?? 0}
            ageTwenties={Number(data?.ageTwenties) ?? 0}
            ageThirties={Number(data?.ageThirties) ?? 0}
            ageForties={Number(data?.ageForties) ?? 0}
            ageFifties={Number(data?.ageFifties) ?? 0}
            ageSixties={Number(data?.ageSixties) ?? 0}
          />
          {/* <DescriptionCard title='실시간 인구 및 혼잡도 추이 현황'></DescriptionCard> */}
          <ResidentRatioCard
            resident={Number(data?.residentRate) ?? 50}
            noneResident={Number(data?.noneResidentRate) ?? 50}
          />
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
