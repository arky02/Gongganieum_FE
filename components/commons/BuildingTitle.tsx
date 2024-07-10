import { BuildingType, PageType } from 'types/client.types';
import { IconMarker } from 'public/icons';
import Tag from './Tag';

const BuildingTitle = (props: {
  buildingInfo: BuildingType | undefined;
  page: PageType;
}) => {
  const { buildingInfo, page } = props;
  const parsedTags =
    buildingInfo?.tag === 'NULL' ? [] : buildingInfo?.tag?.split(',');
  const isPopup = new Date(buildingInfo?.latest_end_date ?? '') > new Date();

  return (
    <div
      className={`${page === 'map' ? 'mb-36 mt-24' : 'mb-56 md:mb-36'} flex w-full flex-col`}
    >
      <h2
        className={`${page == 'map' ? 'text-28' : 'text-[3.6rem]'} font-800 md:text-[2.2rem]`}
      >
        {buildingInfo?.name}
      </h2>
      <div className='mb-16 mt-8 flex items-center gap-4 text-16 font-500 text-gray-400 opacity-80 md:text-14'>
        <IconMarker />
        {buildingInfo?.address}
      </div>
      <div className='flex flex-wrap gap-8'>
        {!!buildingInfo?.isours && <Tag type='직영' />}
        {isPopup && <Tag type='팝업진행중' />}
        <Tag type='카테고리' text={buildingInfo?.cate} />
        {parsedTags?.map((tag) => <Tag key={tag} type='일반' text={tag} />)}
      </div>
    </div>
  );
};

export default BuildingTitle;
