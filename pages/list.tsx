import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getBuildings } from 'apis/api';
import ListBuildingCard from 'components/pages/list/ListBuildingCard';

const List = () => {
  const { data: buildingListData } = useQuery({
    queryKey: ['buildingListData'],
    queryFn: () => getBuildings(),
  });

  console.log(buildingListData);

  return (
    <div className='flex justify-center'>
      <div className='mx-auto my-20 grid grid-cols-3 gap-x-24 gap-y-48'>
        {buildingListData?.map((building) => (
          <ListBuildingCard
            key={building._id}
            name={building.name}
            address={building.address}
            isours={building.isours}
            cate={building.cate}
            tag={building.tag}
            latest_end_date={building.latest_end_date}
          />
        ))}
      </div>
    </div>
  );
};

export default List;
