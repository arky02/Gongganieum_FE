import { PopupType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';

const PopupHistoryCard = (props: { popups: PopupType[] }) => {
  const { popups } = props;

  return (
    <DescriptionCard title='팝업 이력'>
      <ul className='flex h-232 w-full flex-col gap-8 overflow-auto'>
        {popups.map((popup) => (
          <Popup key={popup.name} popup={popup} />
        ))}
      </ul>
    </DescriptionCard>
  );
};

export default PopupHistoryCard;

const Popup = (props: { popup: PopupType }) => {
  const { popup } = props;
  return (
    <li className=''>
      <div className='flex justify-between'>
        <span>{popup.name}</span>
        <span>{popup.type}</span>
      </div>
      <div>{popup.date}</div>
    </li>
  );
};
