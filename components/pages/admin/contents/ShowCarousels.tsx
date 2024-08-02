import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { CAROUSEL_LIST_HEADER } from 'constants/admin\bContentTableHeader';
import { useState } from 'react';
import { getAllCarouselInfo } from 'apis/api';
import { CarouselType } from 'types/client.types';
import { IconClose } from 'public/icons';

const ShowCarousels = () => {
  const { data: allCarouselInfos } = useQuery({
    queryKey: ['carousel'],
    queryFn: getAllCarouselInfo,
  });

  const [selectedUser, setSelectedUser] = useState<CarouselType>();
  const [query, setQuery] = useState('');

  const filteredUserList =
    query === ''
      ? allCarouselInfos
      : allCarouselInfos?.filter((carousel: CarouselType) => {
          return carousel.content.name
            .toLowerCase()
            .includes(query.toLowerCase());
        });

  return (
    <div className='-mt-12 h-680 w-1340 rounded-8 bg-[#f1f1f1] p-20'>
      <h3 className='mb-12 ml-8 mt-4 text-20 font-700'>캐러셀 검색</h3>
      <Combobox
        value={selectedUser}
        onChange={(value) => {
          if (value?._id) setSelectedUser(value!);
        }}
        onClose={() => setQuery('')}
      >
        <ComboboxInput
          className={'mb-16 w-full rounded-16 px-20 py-12 placeholder-gray-300'}
          placeholder='캐러셀 컨텐츠 ID로 검색'
          aria-label='Assignee'
          displayValue={(carousel: CarouselType) =>
            carousel?.content.name ?? ''
          }
          onChange={(event) => setQuery(event.target.value)}
        />
        <CarouselListCell carousel={CAROUSEL_LIST_HEADER} />

        <ComboboxOptions
          static
          anchor='bottom'
          transition
          className={'mt-56 h-500 w-[var(--input-width)]'}
        >
          {filteredUserList?.map((carousel: CarouselType) => (
            <ComboboxOption
              key={carousel._id}
              value={carousel}
              className='mt-[2px] flex cursor-default select-none items-center bg-[#f1f1f1] py-[3px]'
            >
              {/* 케러셀 list cells */}
              <CarouselListCell carousel={carousel} />
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

const CarouselListCell = (props: { carousel: CarouselType }) => {
  const { carousel } = props;

  return (
    <div
      className={`flex w-full rounded-4 p-8 text-center font-500 shadow ${carousel._id === 0 ? 'bg-[#4a4a4a] text-white' : 'bg-white'}`}
    >
      <h5 className='w-100 overflow-ellipsis'>
        {carousel._id === 0 ? '캐러셀 ID' : carousel._id}
      </h5>
      <h5 className='w-200 overflow-ellipsis'>{carousel.carouselType}</h5>
      <h5 className='w-200 overflow-ellipsis'>{carousel.contentType}</h5>
      <h5 className='w-180 overflow-ellipsis'>{carousel.pageType}</h5>
      <h5 className='w-180 overflow-ellipsis'>
        {carousel._id === 0 ? '컨텐츠 ID' : carousel.contentId}
      </h5>
      <div className='max-h-100 w-full overflow-y-auto overflow-ellipsis'>
        {carousel._id === 0 ? (
          '캐러셀 컨텐츠 내용'
        ) : (
          <div>
            <h5 className='w-full overflow-ellipsis'>
              {carousel?.content?._id}
            </h5>
            <h5 className='w-full overflow-ellipsis'>
              {carousel.content?.address}
            </h5>
            <h5 className='w-full overflow-ellipsis'>
              {carousel.content?.name}
            </h5>
            <h5 className='w-full overflow-ellipsis'>
              {carousel.content?.cate}
            </h5>
            <h5 className='w-full overflow-ellipsis'>
              {carousel.content?.tag}
            </h5>
          </div>
        )}
      </div>
      {carousel._id ? (
        <div
          className='w-40 cursor-pointer overflow-ellipsis text-[#000000]'
          onClick={() => {
            const res = confirm(
              `ID: ${carousel._id} 케러셀 데이터를 DB에서 정말로 삭제하시겠습니까?`,
            );
            //handleDelete();
          }}
        >
          <IconClose></IconClose>
        </div>
      ) : (
        <div className='w-64'></div>
      )}
    </div>
  );
};
export default ShowCarousels;
