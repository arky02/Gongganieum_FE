import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import useBuildingImageUrls from 'hooks/useBuildingImageUrls';
import { getBuildingInfo } from 'apis/api';
import BuildingTitle from 'components/commons/BuildingTitle';
import ImageLayout from 'components/commons/ImageLayout';
import Description from 'components/commons/description/Description';
import { IconArrowBack, IconMarker } from 'public/icons';

const BuildingDescriptionPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const buildingId = Number(id);

  const { data: buildingInfo } = useQuery({
    queryKey: ['buildingInfo', buildingId],
    queryFn: () => getBuildingInfo(buildingId),
    enabled: !!buildingId,
  });

  const imageUrls = useBuildingImageUrls(buildingInfo?.address);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className='mx-auto mb-76 mt-56 max-w-1232'>
      <button
        type='button'
        onClick={handleGoBack}
        className='mb-24 flex items-center gap-8 text-14 font-700'
      >
        <IconArrowBack />
        뒤로가기
      </button>
      <ImageLayout imageUrls={imageUrls} page='description' />
      <div className='my-56 flex gap-56'>
        <div className='w-776 shrink-0'>
          <BuildingTitle buildingInfo={buildingInfo} page='description' />
          <Description
            popups={buildingInfo?.popups ?? []}
            address={buildingInfo?.address ?? ''}
            coord={buildingInfo?.coord?.split(',') ?? []}
            page='description'
          />
        </div>
        <ContactBox
          name={buildingInfo?.name ?? ''}
          address={buildingInfo?.address ?? ''}
        />
      </div>
    </div>
  );
};

export default BuildingDescriptionPage;

const ContactBox = (props: { name: string; address: string }) => {
  const { name, address } = props;

  return (
    <div className='shadow-[rgba(0,0,0,0.06) sticky top-92 h-172 w-400 shrink-0 rounded-16 border border-[rgba(0,0,0,0.06)] p-24 shadow-lg'>
      <div className='pb-8 text-24 font-800'>{name}</div>
      <div className='flex items-center gap-8 pb-16 text-16 font-500 text-gray-400'>
        <IconMarker />
        {address}
      </div>
      <div className='flex h-44 gap-12'>
        <button className='h-44 w-44 shrink-0 rounded-full border border-[rgba(0,0,0,0.2)]'></button>
        <button className='h-full w-full rounded-8 bg-black text-16 font-700 text-white'>
          문의하기
        </button>
      </div>
    </div>
  );
};
