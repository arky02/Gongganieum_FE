import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
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

  const imageUrls = buildingInfo?.img?.split(',');

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className='mx-auto max-w-1280 px-24 pb-76 pt-56 md:p-24'>
      <button
        type='button'
        onClick={handleGoBack}
        className='mb-24 flex items-center gap-8 text-14 font-700 md:mb-16'
      >
        <IconArrowBack />
        뒤로가기
      </button>
      <ImageLayout imageUrls={imageUrls} page='description' />
      <div className='my-56 flex gap-56 md:my-24'>
        <div className='w-776 shrink-0 md:w-full'>
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
          id={buildingId}
        />
      </div>
    </div>
  );
};

export default BuildingDescriptionPage;

const ContactBox = (props: { name: string; address: string; id: number }) => {
  const { name, address, id } = props;

  return (
    <div className='sticky top-92 z-nav h-172 w-400 shrink-0 rounded-16 border border-[rgba(0,0,0,0.06)] bg-white p-24 shadow-lg md:fixed md:bottom-0 md:left-0 md:right-0 md:top-auto md:h-92 md:w-screen md:rounded-none'>
      <div className='pb-8 text-24 font-800 md:hidden'>{name}</div>
      <div className='flex items-center gap-8 pb-16 text-16 font-500 text-gray-400 md:hidden'>
        <IconMarker />
        {address}
      </div>
      <div className='flex h-44 gap-12'>
        <button className='h-44 w-44 shrink-0 rounded-full border border-[rgba(0,0,0,0.2)]'></button>
        <Link
          href={`/contact/${id}`}
          className='flex h-full w-full items-center justify-center rounded-8 bg-black text-16 font-700 text-white'
        >
          문의하기
        </Link>
      </div>
    </div>
  );
};
