import { ReactNode } from 'react';

const DescriptionCard = (props: { title?: string; children: ReactNode }) => {
  const { title, children } = props;
  return (
    <div className='rounded-12 border border-[#E2E5E9] p-24'>
      {title && (
        <h4 className='mb-16 text-20 font-800 text-gray-400'>{title}</h4>
      )}
      {children}
    </div>
  );
};

export default DescriptionCard;
