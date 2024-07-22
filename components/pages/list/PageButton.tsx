import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { IconArrowLeft, IconArrowRight } from 'public/icons';

export const PAGE_LIMIT = 30;
export const MAX_PAGE = 10;

const PageButton = (props: {
  count: number;
  selectedPage: number;
  setPage: Dispatch<SetStateAction<string>>;
}) => {
  const { count, selectedPage, setPage } = props;

  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  useEffect(() => {
    setStart(Math.floor(selectedPage / 10) * 10 + 1);
  }, [selectedPage]);

  useEffect(() => {
    const maxPage = Math.ceil(count / PAGE_LIMIT);
    setEnd(maxPage > start + MAX_PAGE - 1 ? start + MAX_PAGE - 1 : maxPage);
  }, [count, start, selectedPage]);

  const handlePageNavigate = (page: number) => {
    setPage(String(page));
  };

  return (
    <div className='flex w-full items-center justify-center gap-12 pt-28 md:pt-16'>
      {start !== 1 ? (
        <button
          onClick={() => handlePageNavigate(start - 10)}
          className='h-16 w-16'
        >
          <IconArrowLeft stroke={'#656565'} stroke-width={2} />
        </button>
      ) : (
        <div className='w-16' />
      )}
      <div className='flex items-center gap-12 font-500 text-[#a5a5a5]'>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => handlePageNavigate(page)}
            className={`${page === selectedPage ? 'text-black' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>
      {end !== Math.ceil(count / PAGE_LIMIT) ? (
        <button
          onClick={() => handlePageNavigate(start + 10)}
          className='h-16 w-16'
        >
          <IconArrowRight stroke={'#656565'} stroke-width={2} />
        </button>
      ) : (
        <div className='w-16' />
      )}
    </div>
  );
};

export default PageButton;
