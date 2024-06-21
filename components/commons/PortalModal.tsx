import { ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const PortalModal = (props: { children: ReactElement }) => {
  const { children } = props;
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // CSR을 마친 후, window객체가 있을 때만 동작 (SSR 단계에서는 에러)
  if (typeof window === 'undefined') return;

  return (
    <>
      {mounted &&
        createPortal(
          children,
          document.getElementById('modal-root') as HTMLElement,
        )}
    </>
  );
};

export default PortalModal;
