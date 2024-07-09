import { ReactNode } from 'react';
import { PageType } from 'types/client.types';

const DescriptionCard = (props: {
  title?: string;
  children: ReactNode;
  page: PageType;
}) => {
  const { title, children, page } = props;
  return (
    <div
      className={`relative w-full shrink-0 rounded-12 border border-[#E2E5E9] p-24 ${page === 'map' ? '' : 'min-h-316 md:min-h-0'}`}
    >
      {title && (
        <h4 className='mb-16 text-20 font-800 text-gray-400 md:text-18'>
          {title}
        </h4>
      )}
      {children}
    </div>
  );
};

export default DescriptionCard;
