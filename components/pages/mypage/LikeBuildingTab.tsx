import { EMPTY_LIST_URL } from 'constants/common';
import Image from 'next/image';
import { BuildingType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';

const LikeBuildingTab = (props: {
  likeBuildings: BuildingType[] | undefined;
}) => {
  const { likeBuildings } = props;

  return (
    <div className='grid min-h-300 grid-cols-3 gap-x-24 gap-y-48 md:grid-cols-2 md:gap-x-8 md:gap-y-36'>
      {likeBuildings?.length !== 0 ? (
        <div className='grid min-h-300 grid-cols-3 gap-x-24 gap-y-48 md:grid-cols-2 md:gap-x-8 md:gap-y-36'>
          {likeBuildings?.map((building: BuildingType) => (
            <BuildingCard
              mode='like'
              key={building._id}
              _id={building._id}
              building={building}
              isLiked={true}
            />
          ))}
        </div>
      ) : (
        <div className='flex h-[40dvh] w-full flex-col items-center justify-center gap-24'>
          <div className='relative h-152 w-152'>
            <Image
              src={EMPTY_LIST_URL}
              alt='비어있는 리스트 이미지'
              fill
              className='object-cover'
            />
          </div>
          <div className='flex flex-col items-center justify-center text-18'>
            <span>아직 찜한 건물이 없습니다.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LikeBuildingTab;
