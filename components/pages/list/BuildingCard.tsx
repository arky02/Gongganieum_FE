import Image from 'next/image';
import { useState } from 'react';
import Tag from 'components/commons/Tag';
import { IconBlankLike, IconRedLike } from 'public/icons';

const MOCK_BUILDING_IMAGE_URL = '/images/mock-building-image.jpg';

const BuildingCard = () => {
  const [isLike, setIsLike] = useState(false);
  return (
    <div className='relative flex w-396 flex-col text-start'>
      <div className='relative mb-20 h-352 w-full overflow-hidden rounded-12'>
        <Image
          src={MOCK_BUILDING_IMAGE_URL}
          fill
          className='cursor-pointer object-cover '
          alt='빌딩 이미지'
        />
      </div>
      {/* TODO: 찜하기 버튼 공용 컴포넌트로 분리하기 */}
      <button
        className='absolute right-20 top-20'
        onClick={() => setIsLike(!isLike)}
      >
        {isLike ? <IconRedLike /> : <IconBlankLike />}
      </button>
      <Description name={'노송 오재'} address={'전라도 전주시'} />
      <div className='flex flex-wrap gap-8'>
        <Tag type='직영' />
        <Tag type='팝업진행중' />
        <Tag type='카테고리' text={'송민혁'} />
        <Tag type='일반' text={'퇴근'} />
      </div>
      <div className='flex flex-wrap gap-8'></div>
    </div>
  );
};

export default BuildingCard;

const Description = (props: { name: string; address: string }) => {
  const { name, address } = props;

  return (
    <div className='mb-12 flex flex-col gap-4'>
      <h3 className='text-20 font-700'>{name}</h3>
      <span className='text-16 text-gray-400'>{address}</span>
    </div>
  );
};
