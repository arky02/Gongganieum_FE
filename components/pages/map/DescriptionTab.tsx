import { BuildingType, PopupType } from 'types/client.types';
import PopupCard from './PopupCard';

interface Props {
  id: number;
}

const DescriptionTab = ({ id }: Props) => {
  return (
    <div className='fixed bottom-0 left-0 top-0 z-popup w-372 overflow-y-auto bg-white p-32'>
      <button
        // onClick={closeTab}
        className='relative right-0 top-0 mb-12 h-24 w-24 rounded-full border border-gray-600 text-sm text-gray-600'
      >
        X
      </button>
      <div className='text-2xl font-bold'>더 현대 서울</div>
      <div className='text-lg'>서울특별시 영등포구 여의대로 108</div>

      <div className='flex flex-col gap-12 pt-24'>
        <div className='text-sm text-gray-600'>
          152개의 팝업 이력이 있습니다.
        </div>
        {/* {building.popups.map((popup) => (
          <PopupCard key={popup.name} popup={popup} />
        ))} */}
      </div>
    </div>
  );
};

export default DescriptionTab;
