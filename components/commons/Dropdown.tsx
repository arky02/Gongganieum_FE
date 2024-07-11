import { Dispatch, SetStateAction, useRef } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';
import { IconArrowDown } from 'public/icons';

const Dropdown = <T extends string>(props: {
  elements: readonly T[];
  selected: T;
  setSelected: Dispatch<SetStateAction<T>>;
}) => {
  const { elements, selected, setSelected } = props;

  const ref = useRef(null);
  const [isVisible, setIsVisible] = useOutsideClick(ref, false);

  const handleMenuClick = (e: T) => {
    setSelected(e);
    setIsVisible(false);
  };

  return (
    <div ref={ref} className='relative h-full w-full shrink-0'>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        type='button'
        className='flex h-full w-full shrink-0 items-center justify-between rounded-8 border border-gray-200 bg-gray-100 p-12 text-14 font-500 text-gray-300'
      >
        {selected}
        <IconArrowDown />
      </button>
      {isVisible && (
        <ul className='absolute z-floating w-full translate-y-8 overflow-hidden rounded-8 border border-gray-200 bg-white'>
          {elements.map((el) => (
            <li
              onClick={() => handleMenuClick(el)}
              key={el}
              className='flex h-48 w-full items-center p-12 text-14 font-500 text-gray-300 hover:bg-gray-200'
            >
              {el}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
