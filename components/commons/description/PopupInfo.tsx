import { PopupType } from 'types/client.types';
import DescriptionCard from './DescriptionCard';
import PopupRankingCard from './PopupRankingCard';

const PopupInfo = (props: { popups: PopupType[] }) => {
  const { popups } = props;

  return (
    <div>
      <h3 className='mb-16 text-24 font-800'>팝업 정보</h3>
      <div className='flex flex-col gap-24'>
        <PopupRankingCard popups={popups} />
        <DescriptionCard title='팝업 이력'></DescriptionCard>
      </div>
    </div>
  );
};

export default PopupInfo;
