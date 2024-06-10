import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';

type UseOutsideClickType = (
  el: RefObject<HTMLDivElement>,
  initialState: boolean,
) => [boolean, Dispatch<SetStateAction<boolean>>];

const useOutsideClick: UseOutsideClickType = (el, initialState) => {
  const [isVisible, setIsVisible] = useState(initialState);

  useEffect(() => {
    const handleOutsideClick = (e: Event) => {
      if (el.current !== null && !el.current.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  });

  return [isVisible, setIsVisible];
};

export default useOutsideClick;
