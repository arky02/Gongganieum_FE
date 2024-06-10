import { Dispatch, SetStateAction, useRef } from 'react';
import useOutsideClick from 'hooks/useOutsideClick';

interface Props {
  elements: string[];
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

const Dropdown = ({ elements, selected, setSelected }: Props) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useOutsideClick(ref, false);

  const handleMenuClick = (e: string) => {
    setSelected(e);
    setIsVisible(false);
  };

  return (
    <div ref={ref} className='relative'>
      <button
        onClick={() => setIsVisible((prev) => !prev)}
        type='button'
        className='h-full w-72 border border-black'
      >
        {selected}
      </button>
      {isVisible && (
        <ul className='absolute'>
          {elements.map((e) => (
            <li
              onClick={() => handleMenuClick(e)}
              key={e}
              className='h-28 w-100 border border-black'
            >
              {e}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
