import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from 'store';
import { getBuildingInfo } from 'apis/api';
import PopupCard from './PopupCard';

const BuildingTab = (props: { id: number }) => {
  const { id } = props;

  const router = useRouter();
  const { map } = useStore((state) => ({
    map: state.map,
  }));

  const { data: buildingInfo } = useQuery({
    queryKey: ['buildingInfo', id],
    queryFn: () => getBuildingInfo(id),
  });

  useEffect(() => {
    if (!buildingInfo || !map) {
      return;
    }

    const coord = buildingInfo.coord.split(',');
    const position = new window.kakao.maps.LatLng(
      Number(coord[0]) + 0.0002,
      coord[1],
    );

    const bound = new window.kakao.maps.LatLngBounds();
    bound.extend(position);
    map.panTo(bound);

    const infoWindow = new window.kakao.maps.InfoWindow({
      map,
      position,
      content: buildingInfo.name,
    });

    return () => {
      infoWindow.close();
    };
  }, [map, buildingInfo]);

  return (
    <div className='fixed bottom-0 left-0 top-0 z-popup w-372 overflow-y-auto bg-white p-32'>
      <button
        onClick={() => router.back()}
        className='relative right-0 top-0 mb-12 h-24 w-24 rounded-full border border-gray-600 text-sm text-gray-600'
      >
        {'<'}
      </button>
      <div className='text-2xl font-bold'>{buildingInfo?.name}</div>
      <div className='text-lg'>{buildingInfo?.address}</div>

      <div className='flex flex-col gap-12 pt-24'>
        <div className='text-sm text-gray-600'>
          {buildingInfo?.popups?.length}개의 팝업 이력이 있습니다.
        </div>
        {buildingInfo?.popups?.map((popup) => (
          <PopupCard key={popup.name} popup={popup} />
        ))}
      </div>
    </div>
  );
};

export default BuildingTab;
