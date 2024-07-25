import Link from 'next/link';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

const ConsentCheckBox = <T extends FieldValues>(
  props: UseControllerProps<T>,
) => {
  const { field, fieldState } = useController(props);

  return (
    <div className='flex items-center gap-8'>
      <input
        id='agree-checkbox'
        type='checkbox'
        {...field}
        checked={field.value}
      />
      <Link href='/'>
        <label
          htmlFor='agree-checkbox'
          className='underline-offset-3 font-600 underline'
        >
          개인정보수집 및 이용 동의
        </label>
      </Link>
      <div className='text-12 text-red'>{fieldState?.error?.message}</div>
    </div>
  );
};

export default ConsentCheckBox;
