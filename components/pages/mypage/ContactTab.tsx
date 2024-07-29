import { useQuery } from '@tanstack/react-query';
import { NO_IMAGE_URL, ROOT_IMAGE_URL } from 'constants/common';
import Image from 'next/image';
import { getBuildingInfo } from 'apis/api';
import { IconArrowRight } from 'public/icons';

const MOCK_CONTACT = {
  buildingId: 1,
  name: '임건우',
  phone: '0101245678',
  email: 'hello@gmail.com',
  company: '공간이음',
  date1: '2024.01.02 ~ 2024.02.01',
  date2: '2024.01.02 ~ 2024.02.01',
  budget: '1000000',
  reason: '팝업을 진행하고자 합니다.',
  size: '100 ~ 120',
  areaList: '성동구, 중구, 영등포구',
  requests: '특별히 없습니다.',
};

const ContactTab = () => {
  return (
    <div className='grid min-h-400 w-full grid-cols-2 gap-12'>
      <MyContact />
      <MyContact />
      <MyContact />
      <MyContact />
      <MyContact />
    </div>
  );
};

const MyContact = () => {
  // const { contact } = props;
  const contact = MOCK_CONTACT;
  const { data: buildingInfo } = useQuery({
    queryKey: ['user', 'contact', contact.buildingId],
    queryFn: () => getBuildingInfo(contact.buildingId),
    enabled: !!contact.buildingId,
  });

  console.log(buildingInfo);

  const imageUrls = buildingInfo?.img
    ?.split(', ')
    ?.map((url) => ROOT_IMAGE_URL + url);

  console.log(imageUrls);

  return (
    <div className='flex h-180 w-full items-center gap-16 rounded-12 border border-gray-200 p-16'>
      <div className='relative aspect-square h-full overflow-hidden rounded-8'>
        <Image
          src={imageUrls?.[0] ?? NO_IMAGE_URL}
          alt='빌딩 사진'
          fill
          className='object-cover'
        />
      </div>
      <div className='flex flex-col gap-8'>
        <div className='text-14 text-gray-300'>접수일: 8/16</div>
        <div className='text-20 font-500 underline underline-offset-2'>
          {buildingInfo?.name}
        </div>
        <div className='text-gray-400'>{buildingInfo?.address}</div>
      </div>
      <div className='ml-auto flex text-[#7799ff]'>
        상세보기{' '}
        <IconArrowRight stroke={'#7799ff'} width={16} stroke-width={2} />
      </div>
    </div>
  );
};

export default ContactTab;
