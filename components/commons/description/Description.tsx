import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getPopulationData } from 'apis/getPopulationData';
import { PopupType } from 'types/client.types';
import AgeRatioCard from './AgeRatioCard';
import BuildingInfoCard from './BuildingInfoCard';
import CongestionCard from './CongestionCard';
import GenderRatioCard from './GenderRatioCard';
import MapCard from './MapCard';
import PopupHistoryCard from './PopupHistoryCard';
import PopupRankingCard from './PopupRankingCard';
import ResidentRatioCard from './ResidentRatioCard';

const Description = (props: {
  popups: PopupType[];
  address: string;
  coord: string[];
}) => {
  const { popups, address, coord } = props;

  const { data } = useQuery({
    queryKey: ['region', coord],
    queryFn: () => getPopulationData(coord),
  });

  const router = useRouter();
  const showMap = router.pathname === '/map' ? false : true;

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
      {data && (
        <div>
          <h3 className='mb-16 text-24 font-800'>
            {data.areaName} 지역 데이터
          </h3>
          <div className='flex flex-col gap-24'>
            <GenderRatioCard
              male={Number(data.maleRate) ?? 50}
              female={Number(data.femaleRate) ?? 50}
            />
            <AgeRatioCard
              ageTeenager={Number(data.ageTeenager) ?? 0}
              ageTwenties={Number(data.ageTwenties) ?? 0}
              ageThirties={Number(data.ageThirties) ?? 0}
              ageForties={Number(data.ageForties) ?? 0}
              ageFifties={Number(data.ageFifties) ?? 0}
              ageSixties={Number(data.ageSixties) ?? 0}
            />
            <CongestionCard
              time={data.congestion?.time ?? []}
              value={data.congestion?.value ?? []}
            />
            <ResidentRatioCard
              resident={Number(data.residentRate) ?? 50}
              noneResident={Number(data.noneResidentRate) ?? 50}
            />
          </div>
        </div>
      )}

      {showMap && (
        <div>
          <h3 className='mb-16 text-24 font-800'>찾아오시는 길</h3>
          <MapCard coord={coord} />
        </div>
      )}
    </div>
  );
};

export default Description;
