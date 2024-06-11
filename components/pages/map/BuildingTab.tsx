import { useQuery } from '@tanstack/react-query';
import { BUILDINGS_MOCK_DATA } from 'mock/popup';
import { useRouter } from 'next/router';
import { getBuildingInfo } from 'apis/api';
import { instance } from 'apis/config/default';
import PopupCard from './PopupCard';

interface Props {
  id: number;
}

const BuildingTab = ({ id }: Props) => {
  const router = useRouter();

  // const { data: buildingInfo } = useQuery({
  //   queryKey: ['buildingInfo', id],
  //   queryFn: () => getBuildingInfo(id),
  // });

  // console.log(buildingInfo);

  const buildingInfo = BUILDINGS_MOCK_DATA[0];

  return (
    <div className='fixed bottom-0 left-0 top-0 z-popup w-372 overflow-y-auto bg-white p-32'>
      <button
        onClick={() => router.back()}
        className='relative right-0 top-0 mb-12 h-24 w-24 rounded-full border border-gray-600 text-sm text-gray-600'
      >
        {'<'}
      </button>
      <div className='text-2xl font-bold'>{buildingInfo.name}</div>
      <div className='text-lg'>{buildingInfo.address}</div>

      <div className='flex flex-col gap-12 pt-24'>
        <div className='text-sm text-gray-600'>
          {buildingInfo.popups.length}개의 팝업 이력이 있습니다.
        </div>
        {buildingInfo.popups.map((popup) => (
          <PopupCard key={popup.name} popup={popup} />
        ))}
      </div>
    </div>
  );
};

export default BuildingTab;
