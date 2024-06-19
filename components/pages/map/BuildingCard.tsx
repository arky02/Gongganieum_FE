import Image from 'next/image';
import { useRouter } from 'next/router';
import { useStore } from 'store';
import { BuildingType } from 'types/client.types';
import Tag from 'components/commons/Tag';

const MOCK_BUILDING_IMAGE_URL = '/images/mock-building-image.jpg';

const BuildingCard = (props: { building: BuildingType }) => {
  const { building } = props;

  const router = useRouter();
  const { map } = useStore((state) => ({
    map: state.map,
  }));

  const handleClick = () => {
    if (!map) {
      return;
    }

    router.push({ query: { building: building._id } });

    const coord = building.coord.split(',');
    const position = new window.kakao.maps.LatLng(coord[0], coord[1]);
    const bound = new window.kakao.maps.LatLngBounds();
    bound.extend(position);
    map.panTo(bound);
  };

  const parsedTags = building?.tag === 'NULL' ? [] : building?.tag?.split(',');
  const isPopup = new Date(building?.latest_end_date ?? '') > new Date();

  return (
    <button
      onClick={handleClick}
      type='button'
      className='flex flex-col text-start'
    >
      <div className='relative mb-20 h-352 w-full overflow-hidden rounded-12'>
        <Image
          src={MOCK_BUILDING_IMAGE_URL}
          fill
          className='object-cover'
          alt='빌딩 이미지'
        />
      </div>
      <Description name={building?.name} address={building?.address} />
      <div className='flex flex-wrap gap-8'>
        {!!building?.isours && <Tag type='직영' />}
        {isPopup && <Tag type='팝업진행중' />}
        <Tag type='카테고리' text={building?.cate} />
        {parsedTags?.map((tag) => <Tag key={tag} type='일반' text={tag} />)}
      </div>
    </button>
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
