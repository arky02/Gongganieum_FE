import { SubmitHandler, useFormContext } from 'react-hook-form';
import useFunnel from 'hooks/useFunnel';
import { ContactFormValues } from 'pages/contact/[id]';
import EtcStep from './EtcStep';
import PersonalInfoStep from './PersonalInfoStep';
import ProgressBar from './ProgressBar';
import UsageInfoStep from './UsageInfoStep';

const CONTACT_STEPS = ['문의자 정보', '사용 정보', '기타 정보'];

const ContactFunnel = () => {
  const { Funnel, Step, setStep, currStepName } = useFunnel(CONTACT_STEPS);

  const currIndex = CONTACT_STEPS.indexOf(currStepName);

  const handleNextStep = () => {
    if (currIndex >= CONTACT_STEPS.length - 1) {
      return;
    }
    setStep(CONTACT_STEPS[currIndex + 1]);
  };

  const handlePrevStep = () => {
    const currIndex = CONTACT_STEPS.indexOf(currStepName);
    if (currIndex <= 0) {
      return;
    }
    setStep(CONTACT_STEPS[currIndex - 1]);
  };

  const { handleSubmit } = useFormContext<ContactFormValues>();

  const submitContactUs: SubmitHandler<ContactFormValues> = (formData) => {
    console.log(formData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitContactUs)}
      className='flex w-full flex-col gap-24'
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
          <EtcStep handlePrevStep={handlePrevStep} />
        </Step>
      </Funnel>
    </form>
  );
};

export default ContactFunnel;
