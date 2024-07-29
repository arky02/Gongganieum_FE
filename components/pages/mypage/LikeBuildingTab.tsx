import { BuildingType } from 'types/client.types';
import BuildingCard from 'components/commons/BuildingCard';

const LikeBuildingTab = (props: {
  likeBuildings: BuildingType[] | undefined;
}) => {
  const { likeBuildings } = props;

  return (
    <div className='grid min-h-300 grid-cols-3 gap-x-24 gap-y-48 md:grid-cols-2 md:gap-x-8 md:gap-y-36'>
      {likeBuildings &&
        likeBuildings?.map((building: BuildingType) => (
          <BuildingCard
            mode='like'
            key={building._id}
            _id={building._id}
            building={building}
            isLiked={true}
          />
        ))}
    </div>
  );
};

export default LikeBuildingTab;
