import { ReactNode, forwardRef } from 'react';

interface Props {
  children: ReactNode;
}

const BottomSheet = forwardRef<HTMLDivElement, Props>(({ children }, ref) => {
  return (
    <div
      ref={ref}
      className='fixed -bottom-[calc(90dvh-108px)] z-nav hidden h-[90dvh] w-full flex-col overflow-hidden rounded-t-16 bg-white px-24 shadow-[0_-6px_20px_rgba(0,0,0,0.1)] transition-transform duration-0 ease-out md:flex'
    >
      <div className='mx-auto my-24 h-4 w-84 shrink-0 rounded-full bg-gray-400' />
      {children}
    </div>
  );
});
BottomSheet.displayName = 'BottomSheetFrame';

export default BottomSheet;
