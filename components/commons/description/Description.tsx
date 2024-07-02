import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getBuildingData } from 'apis/getBuildingData';
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

const TITLE_STYLE = {
  map: 'text-24 font-800',
  description: 'text-28 font-800',
};

type PageType = 'map' | 'description';

const Description = (props: {
  popups: PopupType[];
  address: string;
  coord: string[];
  page: PageType;
}) => {
  const { popups, address, coord, page } = props;

  const { data: regionData } = useQuery({
    queryKey: ['region', address],
    queryFn: () => getPopulationData(coord),
  });
  const { data: buildingData } = useQuery({
    queryKey: ['building', address],
    queryFn: () => getBuildingData(address),
    enabled: !!address,
  });

  const router = useRouter();
  const showMap = router.pathname === '/map' ? false : true;

  return (
    <div className='flex flex-col gap-36'>
      <div>
        <h3 className={`mb-16 ${TITLE_STYLE[page]}`}>팝업 정보</h3>
        <div
          className={`gap-24 ${page === 'map' ? 'flex flex-col' : 'grid grid-cols-2'}`}
        >
          <PopupRankingCard popups={popups} />
          <PopupHistoryCard popups={popups} />
        </div>
      </div>
      <div>
        <h3 className={`mb-16 ${TITLE_STYLE[page]}`}>건물 정보</h3>
        <BuildingInfoCard data={buildingData} page={page} />
      </div>
      {regionData && (
        <div>
          <h3 className={`mb-16 ${TITLE_STYLE[page]}`}>
            {regionData.areaName} 지역 데이터
          </h3>
          <div
            className={`gap-24 ${page === 'map' ? 'flex flex-col' : 'grid grid-cols-2 grid-rows-2'} `}
          >
            <GenderRatioCard
              male={Number(regionData.maleRate) ?? 50}
              female={Number(regionData.femaleRate) ?? 50}
            />
            <AgeRatioCard
              ageTeenager={Number(regionData.ageTeenager) ?? 0}
              ageTwenties={Number(regionData.ageTwenties) ?? 0}
              ageThirties={Number(regionData.ageThirties) ?? 0}
              ageForties={Number(regionData.ageForties) ?? 0}
              ageFifties={Number(regionData.ageFifties) ?? 0}
              ageSixties={Number(regionData.ageSixties) ?? 0}
            />
            <CongestionCard
              time={regionData.congestion?.time ?? []}
              value={regionData.congestion?.value ?? []}
            />
            <ResidentRatioCard
              resident={Number(regionData.residentRate) ?? 50}
              noneResident={Number(regionData.noneResidentRate) ?? 50}
            />
          </div>
        </div>
      )}

      {showMap && (
        <div>
          <h3 className={`mb-16 ${TITLE_STYLE[page]}`}>찾아오시는 길</h3>
          <MapCard coord={coord} />
        </div>
      )}
    </div>
  );
};

export default Description;
