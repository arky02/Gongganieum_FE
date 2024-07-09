import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

const PortalImagePreview = (props: { children: ReactElement }) => {
  const { children } = props;

  if (typeof window === 'undefined') return;

  return createPortal(
    children,
    document.getElementById('image-preview-root') as HTMLElement,
  );
};

export default PortalImagePreview;
