import { ReactNode } from 'react';
import toast from 'react-hot-toast';

const Button = (props: {
  children: ReactNode;
  onClick?: () => void;
  type?: 'submit' | 'button';
  isDisabled?: boolean;
  errorMsg?: string;
}) => {
  const {
    children,
    onClick,
    type = 'button',
    isDisabled = false,
    errorMsg = '',
  } = props;

  const handleClick = () => {
    if (isDisabled) {
      toast.error(errorMsg);
      return;
    }

    if (onClick) onClick();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`flex gap-8 rounded-10 px-200 py-12 text-16 text-white ${isDisabled ? 'bg-[#bcbcbc]' : 'bg-black '}`}
    >
      {children}
    </button>
  );
};

export default Button;
