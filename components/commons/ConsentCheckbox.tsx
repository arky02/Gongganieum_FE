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
    <>
      <input id='agree-checkbox' type='checkbox' {...field} />
      <label htmlFor='agree-checkbox'>개인정보수집 및 이용 동의</label>
      <Link href={'/'} className='pl-12'>
        전체보기
      </Link>
    </>
  );
};

export default ConsentCheckBox;
