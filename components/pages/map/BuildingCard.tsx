import { useRouter } from 'next/router';
import { useStore } from 'store';
import { BuildingType } from 'types/client.types';
import Tag from 'components/commons/Tag';

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

  return (
    <button
      onClick={handleClick}
      type='button'
      className='flex h-272 w-full flex-shrink-0 flex-col gap-4 overflow-hidden rounded-12 border border-black/5 p-16 text-start'
    >
      <Description name={building?.name} address={building?.address} />
      <Tag text='핫플레이스' />
      <Tag type='직영' />
      <Tag type='팝업진행중' />
      <Tag type='카테고리' text={building.cate} />
    </button>
  );
};

export default BuildingCard;

const Description = (props: { name: string; address: string }) => {
  const { name, address } = props;

  return (
    <div className='flex flex-col gap-4'>
      <h3 className='text-18 font-800'>{name}</h3>
      <span className='text-14 text-gray-400'>{address}</span>
    </div>
  );
};
