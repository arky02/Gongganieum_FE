import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useStore } from 'store';
import { getBuildingInfo } from 'apis/api';
import { BuildingType } from 'types/client.types';
import ImageLayout from 'components/commons/ImageLayout';
import Tag from 'components/commons/Tag';
import Description from 'components/commons/description/Description';
import { IconArrowBack, IconMarker } from 'public/icons';

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
      <ImageLayout imageUrls={MOCK_BUILDING_IMAGE_URLS} />
      <Title buildingInfo={buildingInfo} />
      <div className='flex flex-col gap-24'>
        <Description
          popups={buildingInfo?.popups ?? []}
          address={buildingInfo?.address ?? ''}
          region={buildingInfo?.address?.split(' ')?.[1] ?? ''}
          coord={buildingInfo?.coord?.split(',') ?? []}
        />
      </div>
    </div>
  );
};

export default BuildingTab;

const Title = (props: { buildingInfo: BuildingType | undefined }) => {
  const { buildingInfo } = props;
  const parsedTags =
    buildingInfo?.tag === 'NULL' ? [] : buildingInfo?.tag?.split(',');
  const isPopup = new Date(buildingInfo?.latest_end_date ?? '') > new Date();

  return (
    <div className='mb-36 mt-24 flex w-full flex-col'>
      <h2 className='text-28 font-800'>{buildingInfo?.name}</h2>
      <div className='mb-16 mt-8 flex items-center gap-4 text-16 font-500 text-gray-400 opacity-80'>
        <IconMarker />
        {buildingInfo?.address}
      </div>
      <div className='flex flex-wrap gap-8'>
        {!!buildingInfo?.isours && <Tag type='직영' />}
        {isPopup && <Tag type='팝업진행중' />}
        <Tag type='카테고리' text={buildingInfo?.cate} />
        {parsedTags?.map((tag) => <Tag key={tag} type='일반' text={tag} />)}
      </div>
    </div>
  );
};
