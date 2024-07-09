import useFunnel from 'hooks/useFunnel';

const CONTACT_STEPS = ['문의자 정보', '사용 정보', '기타 정보'] as const;

const BuildingContact = () => {
  const { Funnel, Step, setStep, currentStepName } = useFunnel(CONTACT_STEPS);

  return (
    <Funnel>
      <Step name={CONTACT_STEPS[0]}>
        <div></div>
      </Step>
      <Step name={CONTACT_STEPS[1]}>
        <div></div>
      </Step>
      <Step name={CONTACT_STEPS[2]}>
        <div></div>
      </Step>
    </Funnel>
  );
};

export default BuildingContact;
