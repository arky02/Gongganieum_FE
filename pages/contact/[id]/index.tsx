import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import useSession from 'hooks/useSession';
import { getBuildingInfo } from 'apis/api';
import Banner from 'components/pages/contact/Banner';
import ContactFunnel from 'components/pages/contact/ContactFunnel';
import FunnelTitle from 'components/pages/contact/FunnelTitle';
import { PathType } from 'components/pages/contact/steps/EtcStep';
import FinishStep from 'components/pages/contact/steps/FinishStep';

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

  const [submitted, setSubmitted] = useState(false);

  const { getSession } = useSession();
  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push('/');
    }
  }, []);

  return (
    <div className='flex h-[calc(100dvh-72px)] min-h-640 w-screen'>
      <Banner />
      <div className='mx-auto my-auto flex h-full max-h-640 w-full max-w-592 shrink-0 flex-col gap-24 overflow-y-scroll px-16 md:mt-56 md:w-full'>
        {submitted ? (
          <FinishStep />
        ) : (
          <>
            <FunnelTitle name={buildingInfo?.name ?? ''} />
            <FormProvider {...methods}>
              <ContactFunnel
                buildingId={buildingId}
                setSubmitted={setSubmitted}
              />
            </FormProvider>
          </>
        )}
      </div>
    </div>
  );
};

export default BuildingContact;
