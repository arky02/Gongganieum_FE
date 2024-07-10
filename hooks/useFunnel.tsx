import { ReactElement, ReactNode, useState } from 'react';

interface StepType<T> {
  name: T;
  children: ReactNode;
}

interface FunnelType<T> {
  children: Array<ReactElement<StepType<T>>>;
}

const useFunnel = <T extends {}>(stepNames: readonly T[]) => {
  const [step, setStep] = useState<T>(stepNames[0]);

  const Step = (props: StepType<T>) => {
    const { children } = props;
    return <>{children}</>;
  };

  const Funnel = (props: FunnelType<T>) => {
    const { children } = props;

    const renderedStep = children.find(
      (childrenStep) => childrenStep.props.name === step,
    );

    return <>{renderedStep}</>;
  };

  return { Funnel, Step, setStep, currStepName: step };
};

export default useFunnel;
