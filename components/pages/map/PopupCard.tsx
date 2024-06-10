import { PopupType } from 'types/client.types';

interface Props {
  popup: PopupType;
}

const PopupCard = ({ popup }: Props) => {
  return (
    <div className='border border-black p-8'>
      <div className='text-lg font-semibold'>{popup.name}</div>
      <div className='text-sm'>{popup.date}</div>
      <div className='text-sm'>{popup.address}</div>
    </div>
  );
};

export default PopupCard;
