import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const PortalModal = (props: {
  children: ReactElement;
  openStatus: boolean;
}) => {
  const { children, openStatus } = props;
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // CSR을 마친 후, window객체가 있을 때만 동작 (SSR 단계에서는 에러)
  if (typeof window === 'undefined') return;

  return (
    <>
      {mounted &&
        openStatus &&
        createPortal(
          <div>
            <div className='fixed left-0 top-0 z-floating size-full bg-[rgba(0,0,0,0.5)]' />
            <div className='gap-5 pb-58 shadow-main fixed left-1/2 top-1/2 z-floating flex h-fit w-fit -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-[15px] bg-white'>
              {children}
            </div>
          </div>,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </>
  );
};

export default PortalModal;
