import { CATEGORY, CATEGORY_ICON } from 'constants/common';
import { CategoryType, PopupType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';

const PopupHistoryCard = (props: { popups: PopupType[] }) => {
  const { popups } = props;

  return (
    <DescriptionCard title={`팝업 이력 (${popups.length}건)`}>
      <ul className='flex h-232 w-full flex-col gap-16 overflow-auto'>
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

  const parseDate = (date: string) => {
    const splitDate = date.split('.');
    const parsedDate = splitDate.map((el) => (el[0] === '0' ? el[1] : el));

    return `${parsedDate[0]}년 ${parsedDate[1]}월 ${parsedDate[2]}일`;
  };

  const parsedDate = popup.date
    .split(' - ')
    .map((date) => parseDate(date))
    .join(' ~ ');

  return (
    <li className='flex items-center justify-between'>
      <div className='flex flex-col pr-8'>
        <span className='text-16 font-500'>{popup.name}</span>
        <span className='text-14 font-400 text-gray-300'>{parsedDate}</span>
      </div>
      <div className='flex h-24 w-fit shrink-0 items-center gap-4 rounded-[6px] bg-[rgba(0,0,0,0.08)] px-4 text-12 font-600'>
        {CATEGORY_ICON[popup.type as CategoryType] ?? CATEGORY_ICON.기타}
        {CATEGORY.includes(popup.type as CategoryType) ? popup.type : '기타'}
      </div>
    </li>
  );
};
