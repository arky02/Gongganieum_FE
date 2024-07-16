import Link from 'next/link';
import { BuildingType, PageType } from 'types/client.types';
import { IconArrowTopRight, IconMarker } from 'public/icons';
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
      className={`${page === 'map' ? 'mb-36 mt-12 md:mb-24 md:mt-16' : 'mb-56 md:mb-36'} flex w-full flex-col`}
    >
      <div
        className={`${page == 'map' ? 'text-28' : 'text-[3.6rem]'} flex h-44 items-end gap-8 font-800 md:h-32 md:text-[2.2rem]`}
      >
        {buildingInfo?.name}
        {page === 'map' && (
          <Link href={`/list/${buildingInfo?._id}`} className='pb-[10px]'>
            <IconArrowTopRight />
          </Link>
        )}
      </div>
      <div className='mb-16 mt-8 flex h-24 items-center gap-4 text-16 font-500 text-gray-400 opacity-80 md:mb-12 md:mt-4 md:text-14'>
        <IconMarker />
        {buildingInfo?.address}
      </div>
      <div className='flex h-24 flex-wrap gap-8'>
        {!!buildingInfo?.isours && <Tag type='직영' />}
        {isPopup && <Tag type='팝업진행중' />}
        <Tag type='카테고리' text={buildingInfo?.cate} />
        {parsedTags?.map((tag) => <Tag key={tag} type='일반' text={tag} />)}
      </div>
    </div>
  );
};

export default BuildingTitle;
