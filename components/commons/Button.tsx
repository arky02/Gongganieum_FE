import { ReactNode } from 'react';

const Button = (props: { children: ReactNode; onClick?: () => void }) => {
  const { children, onClick } = props;
  return (
    <button
      onClick={onClick}
      className='rounded-10 text-16 flex gap-8 bg-black px-200 py-12 text-white'
    >
      {children}
    </button>
  );
};

export default Button;
