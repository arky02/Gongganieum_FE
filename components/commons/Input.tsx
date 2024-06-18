import { HTMLInputTypeAttribute, ReactNode, useState } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

const Input = <T extends FieldValues>({
  children,
  placeholder,
  type: initialType = 'text',
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController(controls);
  const [type, setType] = useState<HTMLInputTypeAttribute>(initialType);

  const togglePasswordShow = () => {
    if (type === 'password') {
      setType('text');
    } else if (type === 'text') {
      setType('password');
    }
  };

  return (
    <div className='relative'>
      <label htmlFor={field.name} className='text-16 font-700'>
        {children}
      </label>
      <input
        id={field.name}
        placeholder={placeholder}
        type={type}
        {...field}
        className={`rounded-8 font-500 text-14 mt-8 w-full border-[1px] border-gray-200 bg-gray-100 p-12 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400 ${fieldState?.error && 'border-red-600'}`}
      />
      {initialType === 'password' && (
        <button
          onClick={togglePasswordShow}
          type='button'
          className='absolute right-0 top-44 h-24 w-24 -translate-x-1/2 -translate-y-1/2'
        >
          {type === 'password' ? <div>off</div> : <div>on</div>}
        </button>
      )}
      <div className='mt-4 h-8 text-red-600'>{fieldState?.error?.message}</div>
    </div>
  );
};

export default Input;
