import { useRouter } from 'next/router';
import { useStore } from 'store';
import { BuildingType } from 'types/client.types';

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
      className='h-100 border border-black p-12 text-left'
    >
      <p className='text-lg font-bold'>{building?.name}</p>
      <p>{building?.address}</p>
    </button>
  );
};

export default BuildingCard;
