import { ReactNode } from 'react';

const BottomSheet = (props: { children: ReactNode }) => {
  const { children } = props;
  return (
    <div className='fixed bottom-0 flex h-[70dvh] w-full flex-col overflow-hidden rounded-t-16 bg-white px-24 shadow-[0_-6px_20px_rgba(0,0,0,0.1)]'>
      <div className='mx-auto my-24 h-4 w-84 rounded-full bg-gray-400' />
      {children}
    </div>
  );
};

export default BottomSheet;
