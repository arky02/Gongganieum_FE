import useFunnel from 'hooks/useFunnel';
import EtcStep from './EtcStep';
import PersonalInfoStep from './PersonalInfoStep';
import UsageInfoStep from './UsageInfoStep';

const CONTACT_STEPS = ['문의자 정보', '사용 정보', '기타 정보'] as const;

const ContactFunnel = () => {
  const { Funnel, Step, setStep, currentStepName } = useFunnel(CONTACT_STEPS);

  return (
    <Funnel>
      <Step name={CONTACT_STEPS[0]}>
        <PersonalInfoStep />
      </Step>
      <Step name={CONTACT_STEPS[1]}>
        <UsageInfoStep />
      </Step>
      <Step name={CONTACT_STEPS[2]}>
        <EtcStep />
      </Step>
    </Funnel>
  );
};

export default ContactFunnel;
