import { ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
}

const TextInput = <T extends FieldValues>({
  children,
  placeholder,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
    rules: { required: true },
  });

  return (
    <div className='relative'>
      <label htmlFor={field.name} className='text-16 font-700'>
        {children}
      </label>
      <textarea
        id={field.name}
        placeholder={placeholder}
        {...field}
        className={`mt-8 h-92 w-full rounded-8 border border-gray-200 bg-gray-100 p-12 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-400 active:border-gray-400 ${fieldState?.error && 'border-red-600'}`}
      />
      <div className='text-red-600 mt-4 h-8'>{fieldState?.error?.message}</div>
    </div>
  );
};

export default TextInput;
