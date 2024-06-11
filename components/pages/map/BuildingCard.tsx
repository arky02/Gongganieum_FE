import { BuildingType } from 'types/client.types';

interface Props {
  building: BuildingType;
}

const BuildingCard = ({ building }: Props) => {
  return (
    <div className='h-100 border border-black p-12'>
      <p className='text-lg font-bold'>{building?.name}</p>
      <p>{building?.address}</p>
    </div>
  );
};

export default BuildingCard;
