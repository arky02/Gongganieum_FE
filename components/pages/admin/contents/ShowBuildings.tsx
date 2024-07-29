import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { BUILDING_LIST_HEADER } from 'constants/admin\bContentTableHeader';
import { useState } from 'react';
import { getAllBuildingInfos } from 'apis/api';
import { BuildingType, PopupType, UserDataType } from 'types/client.types';
import { IconClose } from 'public/icons';

type showBuildingType = Omit<BuildingType, 'latest_end_date'>;

const ShowBuilding = () => {
  const { data: allBuildingInfos } = useQuery({
    queryKey: ['buildings'],
    queryFn: getAllBuildingInfos,
  });

  const [selectedBuilding, setSelectedBuilding] = useState<showBuildingType>();
  const [query, setQuery] = useState('');

  const filteredBuildingList =
    query === ''
      ? allBuildingInfos
      : allBuildingInfos?.filter((buildingInfo: showBuildingType) => {
          return buildingInfo.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className='-mt-12 h-680 w-1340 rounded-8 bg-[#f1f1f1] p-20'>
      <h3 className='mb-12 ml-8 mt-4 text-20 font-700'>건물 검색</h3>
      <Combobox
        value={selectedBuilding}
        onChange={(value) => {
          if (value?._id) setSelectedBuilding(value!);
        }}
        onClose={() => setQuery('')}
      >
        <ComboboxInput
          className={'mb-20 w-full rounded-16 px-20 py-12 placeholder-gray-300'}
          placeholder='건물 이름(name)으로 원하는 건물 검색'
          aria-label='Assignee'
          displayValue={(user: UserDataType) => user?.name ?? ''}
          onChange={(event) => setQuery(event.target.value)}
        />
        <BuildingListCell building={BUILDING_LIST_HEADER} />

        <ComboboxOptions
          static
          anchor='bottom'
          transition
          className={'mt-64 h-488 w-[var(--input-width)]'}
        >
          {filteredBuildingList?.map((building: showBuildingType) => (
            <ComboboxOption
              key={building._id}
              value={building}
              className='mt-[2px] flex cursor-default select-none items-center bg-[#f1f1f1] py-4'
            >
              {/* 유저 list cells */}
              <BuildingListCell building={building} />
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
};

const BuildingListCell = (props: { building: showBuildingType }) => {
  const { building } = props;
  return (
    <div
      className={`flex w-full rounded-4 p-8 text-center font-500 shadow ${building._id === 0 ? 'bg-[#4a4a4a] text-white' : 'bg-white'}`}
    >
      <h5 className='w-44 overflow-ellipsis'>
        {building._id === 0 ? '건물ID' : building._id}
      </h5>
      <h5 className='w-160 overflow-hidden overflow-ellipsis whitespace-nowrap'>
        {building.name}
      </h5>
      <h5 className='w-80 overflow-ellipsis'>
        {building._id === 0 ? '카테고리' : building.cate}
      </h5>
      <h5 className='w-280 overflow-ellipsis whitespace-nowrap'>
        {building.address}
      </h5>

      <h5 className='w-120 overflow-ellipsis'>{building.img}</h5>
      <h5 className='w-60 overflow-ellipsis'>
        {building._id === 0 ? '직영 건물' : building.isours ? 'O' : 'X'}
      </h5>
      <h5 className='w-160 overflow-ellipsis'>{building.tag}</h5>
      <div className='max-h-100 w-300 overflow-y-auto overflow-ellipsis'>
        {building._id === 0
          ? '팝업 정보'
          : building.popups.map((el: PopupType, idx: number) => (
              <p key={idx}>{el.name}</p>
            ))}
      </div>
      {building._id ? (
        <div
          className='w-40 cursor-pointer overflow-ellipsis text-[#000000]'
          onClick={() => {
            const res = confirm(
              `ID: ${building._id}, 이름: ${building.name} 유저를 DB에서 정말로 삭제하시겠습니까?`,
            );
            //handleDelete();
          }}
        >
          <IconClose />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ShowBuilding;
