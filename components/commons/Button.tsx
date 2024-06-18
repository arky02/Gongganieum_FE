import { ReactNode } from 'react';

const Button = (props: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
}) => {
  const { children, onClick, type = 'button' } = props;
  return (
    <button
      type={type}
      onClick={onClick}
      className='rounded-10 text-16 flex gap-8 bg-black px-200 py-12 text-white'
    >
      {children}
    </button>
  );
};

export default Button;
