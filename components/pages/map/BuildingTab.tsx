import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from 'store';
import { getBuildingInfo } from 'apis/api';
import BuildingTitle from 'components/commons/BuildingTitle';
import ImageLayout from 'components/commons/ImageLayout';
import Description from 'components/commons/description/Description';
import { IconArrowBack } from 'public/icons';

const MOCK_BUILDING_IMAGE_URLS = [
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
  '/images/mock-building-image.jpg',
];

const BuildingTab = (props: { id: number }) => {
  const { id } = props;
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
    const position = new window.kakao.maps.LatLng(Number(coord[0]), coord[1]);

    const infoWindow = new window.kakao.maps.InfoWindow({
      map,
      position,
      content: buildingInfo.name,
      zIndex: 99,
    });

    return () => {
      infoWindow.close();
    };
  }, [map, buildingInfo]);

  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className='flex h-full w-full flex-col overflow-y-auto overflow-x-hidden p-24'>
      <button
        type='button'
        onClick={handleGoBack}
        className='mb-24 flex items-center gap-8 text-14 font-700'
      >
        <IconArrowBack />
        뒤로가기
      </button>
      <ImageLayout imageUrls={MOCK_BUILDING_IMAGE_URLS} page='map' />
      <BuildingTitle buildingInfo={buildingInfo} page='map' />
      <div className='flex flex-col gap-24'>
        <Description
          popups={buildingInfo?.popups ?? []}
          address={buildingInfo?.address ?? ''}
          coord={buildingInfo?.coord?.split(',') ?? []}
          page='map'
        />
      </div>
    </div>
  );
};

export default BuildingTab;
