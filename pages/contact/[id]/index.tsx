import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
import { getBuildingInfo } from 'apis/api';
import Banner from 'components/pages/contact/Banner';
import ContactFunnel from 'components/pages/contact/ContactFunnel';
import { PathType } from 'components/pages/contact/EtcStep';
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
  path: PathType;
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
    enabled: !!id,
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
      path: '검색',
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
