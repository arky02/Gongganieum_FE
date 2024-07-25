import { ReactNode } from 'react';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

interface Props<T extends FieldValues> extends UseControllerProps<T> {
  children: ReactNode;
  placeholder?: string;
  maxLength?: number;
}

const TextInput = <T extends FieldValues>({
  children,
  placeholder,
  maxLength,
  ...controls
}: Props<T>) => {
  const { field, fieldState } = useController({
    ...controls,
  });

  return (
    <div className='relative flex flex-col'>
      <label htmlFor={field.name} className='text-16 font-700'>
        {children}
      </label>
      <textarea
        id={field.name}
        placeholder={placeholder}
        {...field}
        className={`mt-8 w-full rounded-8 border border-gray-200 bg-gray-100 p-12 text-14 font-500 outline-none placeholder:text-[#8A909F] focus:border-gray-300 active:border-gray-300 ${fieldState?.error && 'border-red'}`}
      />
      <div className='h-[10px] pt-[2px] text-12 text-red'>
        {fieldState?.error?.message}
      </div>
      {maxLength && (
        <div className='absolute bottom-12 right-4 text-[1rem] text-gray-300'>
          최대 {maxLength}자
        </div>
      )}
    </div>
  );
};

export default TextInput;
