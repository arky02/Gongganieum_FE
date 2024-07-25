import { useMutation } from '@tanstack/react-query';
import { GunguType } from 'constants/regions';
import { Dispatch, SetStateAction } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import useFunnel from 'hooks/useFunnel';
import { postBuildingContact } from 'apis/api';
import { ContactType } from 'types/client.types';
import { ContactFormValues } from 'pages/contact/[id]';
import ProgressBar from './ProgressBar';
import EtcStep from './steps/EtcStep';
import PersonalInfoStep from './steps/PersonalInfoStep';
import UsageInfoStep from './steps/UsageInfoStep';

const CONTACT_STEPS = ['문의자 정보', '사용 정보', '기타 정보'] as const;

const ContactFunnel = (props: {
  buildingId: number;
  initialRegion: GunguType;
  setSubmitted: Dispatch<SetStateAction<boolean>>;
}) => {
  const { buildingId, initialRegion, setSubmitted } = props;
  const { Funnel, Step, setStep, currStepName } = useFunnel(CONTACT_STEPS);

  const currIndex = CONTACT_STEPS.indexOf(currStepName);

  const handleNextStep = () => {
    if (currIndex >= CONTACT_STEPS.length - 1) {
      return;
    }
    setStep(CONTACT_STEPS[currIndex + 1]);
  };

  const handlePrevStep = () => {
    if (currIndex <= 0) {
      return;
    }
    setStep(CONTACT_STEPS[currIndex - 1]);
  };

  const { handleSubmit } = useFormContext<ContactFormValues>();

  const uploadPostMutation = useMutation({
    mutationFn: (form: ContactType) => postBuildingContact(form),
    onSuccess: () => setSubmitted(true),
  });

  const submitContactUs: SubmitHandler<ContactFormValues> = (formData) => {
    const parsedFormData: ContactType = {
      buildingId,
      name: formData.name,
      phone: String(formData.phone),
      email: formData.email,
      company: formData.company,
      date1: `${formData.primaryStartDate} ~ ${formData.primaryEndDate}`,
      date2: `${formData.secondaryStartDate} ~ ${formData.secondaryEndDate}`,
      budget: String(formData.budget),
      reason: formData.purpose,
      enterpath: formData.path,
      size: `${formData.sizeStart ?? 0} ~ ${formData.sizeEnd ?? 0}`,
      areaList: formData.areaList,
      requests: formData.etc,
    };
    uploadPostMutation.mutate(parsedFormData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitContactUs)}
      className='relative flex w-full flex-col gap-24 md:h-[80%]'
      noValidate
    >
      <ProgressBar index={currIndex} />
      <Funnel>
        <Step name={CONTACT_STEPS[0]}>
          <PersonalInfoStep handleNextStep={handleNextStep} />
        </Step>
        <Step name={CONTACT_STEPS[1]}>
          <UsageInfoStep
            handlePrevStep={handlePrevStep}
            handleNextStep={handleNextStep}
          />
        </Step>
        <Step name={CONTACT_STEPS[2]}>
          <EtcStep
            handlePrevStep={handlePrevStep}
            initialRegion={initialRegion}
          />
        </Step>
      </Funnel>
    </form>
  );
};

export default ContactFunnel;
