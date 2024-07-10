import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { getBuildingInfo } from 'apis/api';
import ContactFunnel from 'components/pages/contact/ContactFunnel';
import FunnelTitle from 'components/pages/contact/FunnelTitle';

export interface ContactFormValues {
  name: string;
  phone: number;
  email: string;
  company: string;
  primaryStartDate: string;
  primaryEndDate: string;
  secondaryStartDate: string;
  secondaryEndDate: string;
  budget: number;
  purpose: string;
  path: string;
  etc: string;
  agreed: boolean;
}

const BuildingContact = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const buildingId = Number(id);

  const { data: buildingInfo } = useQuery({
    queryKey: ['buildingInfo', buildingId],
    queryFn: () => getBuildingInfo(buildingId),
  });

  const methods = useForm<ContactFormValues>({
    defaultValues: {
      name: '',
      phone: undefined,
      email: '',
      company: '',
      primaryStartDate: '',
      primaryEndDate: '',
      secondaryStartDate: '',
      secondaryEndDate: '',
      budget: undefined,
      purpose: '',
      path: '',
      etc: '',
      agreed: false,
    },
    mode: 'onBlur',
  });

  return (
    <div className='flex h-[calc(100dvh-72px)] w-screen'>
      <Banner />
      <div className='mx-auto mt-128 flex h-full w-704 flex-col gap-24 px-16'>
        <FunnelTitle name={buildingInfo?.name ?? ''} />
        <FormProvider {...methods}>
          <ContactFunnel />
        </FormProvider>
      </div>
    </div>
  );
};

export default BuildingContact;

const Banner = () => {
  return (
    <div className='relative h-full w-768 shrink-0'>
      <Image
        alt='문의하기 배경 사진'
        src={'/images/contact-background.png'}
        fill
        className='object-cover'
      />
      <div className='absolute flex h-2/3 w-full justify-center bg-gradient-to-b from-[rgba(255,255,255,0.96)] via-white via-45% to-transparent'>
        <div className='mt-76 flex flex-col gap-12 text-center'>
          <div className='text-[3.6rem] font-800'>
            당신의 팝업스토어를 위한 <br />
            완벽한 공간을 찾다
          </div>
          <div className='text-16 font-500 text-gray-300'>
            공간이음은 단순한 건물 임대가 아닌, 성공적인 팝업스토어 <br />
            운영을 위한 맞춤형 솔루션을 제공합니다.
          </div>
        </div>
      </div>
    </div>
  );
};
