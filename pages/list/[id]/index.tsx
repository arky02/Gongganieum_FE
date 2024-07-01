import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { getBuildingInfo } from 'apis/api';
import ImageLayout from 'components/commons/ImageLayout';

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

const BuildingDescriptionPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const buildingId = Number(id);

  const { data: buildingInfo } = useQuery({
    queryKey: ['buildingInfo', buildingId],
    queryFn: () => getBuildingInfo(buildingId),
  });

  console.log(buildingInfo);

  return (
    <div className='mx-auto my-76 max-w-1232'>
      <ImageLayout imageUrls={MOCK_BUILDING_IMAGE_URLS} page='description' />
    </div>
  );
};

export default BuildingDescriptionPage;
