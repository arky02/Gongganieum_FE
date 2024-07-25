import { PopupType } from 'types/client.types';

const PopupCard = (props: { popup: PopupType }) => {
  const { popup } = props;

  return (
    <div className='border border-black p-8'>
      <div className='text-lg font-semibold'>{popup.name}</div>
      <div className='text-sm'>{popup.date}</div>
    </div>
  );
};

export default PopupCard;
