import Link from 'next/link';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';

const ConsentCheckBox = <T extends FieldValues>(
  props: UseControllerProps<T>,
) => {
  const { field } = useController(props);

  return (
    <div className='flex items-center gap-8'>
      <input id='agree-checkbox' type='checkbox' {...field} />
      <Link href='/'>
        <label
          htmlFor='agree-checkbox'
          className='font-600 underline underline-offset-4'
        >
          개인정보수집 및 이용 동의
        </label>
      </Link>
    </div>
  );
};

export default ConsentCheckBox;
