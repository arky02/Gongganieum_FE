import { BuildingType, PopupType } from 'types/client.types';

interface Props {
  building: BuildingType;
  closeTab: () => void;
}

const DescriptionTab = ({ building, closeTab }: Props) => {
  return (
    <div className='fixed bottom-0 left-0 top-0 z-popup w-372 overflow-y-auto bg-white p-32'>
      <button
        onClick={closeTab}
        className='relative right-0 top-0 mb-12 h-24 w-24 rounded-full border border-gray-600 text-sm text-gray-600'
      >
        X
      </button>
      <div className='text-2xl font-bold'>{building.name}</div>
      <div className='text-lg'>{building.address}</div>

      <div className='flex flex-col gap-12 pt-24'>
        <div className='text-sm text-gray-600'>
          {building.popups.length}개의 팝업 이력이 있습니다.
        </div>
        {building.popups.map((popup) => (
          <Popup key={popup.name} popup={popup} />
        ))}
      </div>
    </div>
  );
};

export default DescriptionTab;

interface PopupProps {
  popup: PopupType;
}

const Popup = ({ popup }: PopupProps) => {
  return (
    <div className='border border-black p-8'>
      <div className='text-lg font-semibold'>{popup.name}</div>
      <div className='text-sm'>{popup.date}</div>
      <div className='text-sm'>{popup.address}</div>
    </div>
  );
};
